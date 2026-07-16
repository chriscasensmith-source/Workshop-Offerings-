import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('workshop explorer', () => {
  it('searches across learning points and announces the result count', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole('searchbox', { name: /search workshops/i }), 'fishbone');

    expect(screen.getByRole('heading', { name: 'AI Assisted Root Cause Analysis' })).toBeVisible();
    await waitForElementToBeRemoved(() =>
      screen.queryByRole('heading', { name: 'Team Building 101' }),
    );
    expect(screen.queryByRole('heading', { name: 'Team Building 101' })).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('1 workshop found');
  });

  it('filters by category', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Leadership' }));

    expect(screen.getByRole('status')).toHaveTextContent('1 workshop found');
    expect(
      screen.getByRole('heading', {
        name: 'Presentation and Facilitation Techniques for Leaders',
      }),
    ).toBeVisible();
  });

  it('filters by duration', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: '60 Minutes' }));

    expect(screen.getByRole('status')).toHaveTextContent('2 workshops found');
    expect(screen.getByRole('heading', { name: 'AI 101: Making Sense of AI at Work' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Team Building 101' })).toBeVisible();
  });

  it('combines search, category, and duration filters', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Artificial Intelligence' }));
    await user.click(screen.getByRole('button', { name: '90 Minutes' }));
    await user.type(screen.getByRole('searchbox', { name: /search workshops/i }), 'fishbone');

    expect(screen.getByRole('status')).toHaveTextContent('1 workshop found');
    expect(screen.getByRole('heading', { name: 'AI Assisted Root Cause Analysis' })).toBeVisible();
  });

  it('resets active filters', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole('searchbox', { name: /search workshops/i }), 'Copilot');
    await user.click(screen.getByRole('button', { name: '90 Minutes' }));
    await user.click(screen.getByRole('button', { name: /reset filters/i }));

    expect(screen.getByRole('searchbox', { name: /search workshops/i })).toHaveValue('');
    expect(screen.getByRole('status')).toHaveTextContent('11 workshops found');
    expect(screen.queryByRole('button', { name: /reset filters/i })).not.toBeInTheDocument();
  });

  it('shows a useful no-results state', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole('searchbox', { name: /search workshops/i }), 'underwater welding');

    const emptyState = screen.getByRole('region', { name: /no workshops found/i });
    expect(within(emptyState).getByText(/try a broader search/i)).toBeVisible();
    expect(within(emptyState).getByRole('button', { name: /clear all filters/i })).toBeVisible();
  });

  it('uses the configured Microsoft Form URL for safe external registration links', () => {
    render(<App />);

    const registrationLinks = screen.getAllByRole('link', { name: /register/i });
    expect(registrationLinks.length).toBeGreaterThan(0);
    for (const link of registrationLinks) {
      expect(link).toHaveAttribute('href', 'https://forms.office.com/r/HgUVx6tuQ8');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});

describe('course details', () => {
  it('opens complete details and closes with Escape while returning focus', async () => {
    const user = userEvent.setup();
    render(<App />);
    const trigger = screen.getByRole('button', {
      name: 'View details for Emotional Intelligence: The RULER Framework',
    });

    await user.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Emotional Intelligence: The RULER Framework' });
    expect(within(dialog).getByText('Recognize emotional signals in yourself and others')).toBeVisible();
    expect(within(dialog).getByText(/participant outcome/i)).toBeVisible();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('closes with the visible close button', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', {
        name: 'View details for Team Building 101',
      }),
    );
    await user.click(screen.getByRole('button', { name: 'Close course details' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when the backdrop is selected', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', {
        name: 'View details for Team Building 101',
      }),
    );
    await user.click(screen.getByTestId('course-detail-overlay'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows the course-specific CliftonStrengths note', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', {
        name: 'View details for CliftonStrengths Team Workshop',
      }),
    );

    expect(
      screen.getByText(
        'Participants may need to complete the CliftonStrengths assessment before attending.',
      ),
    ).toBeVisible();
  });
});

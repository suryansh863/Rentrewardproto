# RentRewards UI Design Guidelines

## Design System

### Colors

```
Primary: #4F46E5 (Indigo 600)
Secondary: #10B981 (Emerald 500)
Accent: #F59E0B (Amber 500)
Background: #F9FAFB (Gray 50)
Surface: #FFFFFF (White)
Error: #EF4444 (Red 500)
Success: #10B981 (Emerald 500)
Warning: #F59E0B (Amber 500)
Info: #3B82F6 (Blue 500)
Text Primary: #111827 (Gray 900)
Text Secondary: #6B7280 (Gray 500)
Border: #E5E7EB (Gray 200)
```

### Typography

```
Font Family: 'Inter', sans-serif

Headings:
- H1: 24px/30px, 700 weight
- H2: 20px/28px, 700 weight
- H3: 18px/24px, 600 weight
- H4: 16px/22px, 600 weight

Body:
- Large: 16px/24px, 400 weight
- Regular: 14px/20px, 400 weight
- Small: 12px/16px, 400 weight

Button:
- Regular: 14px/20px, 500 weight
- Small: 12px/16px, 500 weight
```

### Spacing

```
4px - Extra small (xs)
8px - Small (sm)
12px - Medium (md)
16px - Large (lg)
24px - Extra large (xl)
32px - 2x extra large (2xl)
48px - 3x extra large (3xl)
64px - 4x extra large (4xl)
```

### Border Radius

```
2px - Extra small (xs)
4px - Small (sm)
6px - Medium (md)
8px - Large (lg)
12px - Extra large (xl)
16px - Full (full)
9999px - Pill
```

### Shadows

```
xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
```

## UI Components

### Tenant App (Mobile-first)

#### Navigation

- Bottom tab navigation with 4 main sections:
  - Home (Dashboard)
  - Rent
  - Rewards
  - Referrals

#### Cards

- Rounded corners (lg)
- White background
- Light shadow (sm)
- Padding: lg (16px)

#### Buttons

- Primary: Filled, indigo background
- Secondary: Outlined, indigo border
- Tertiary: Text only, indigo text
- Success: Filled, emerald background
- Danger: Filled, red background
- Height: 44px (standard), 36px (small)
- Border radius: md (6px)
- Padding: horizontal md (12px)

#### Forms

- Input height: 44px
- Label: Above input, small text
- Helper text: Below input, extra small text
- Error state: Red border, error message below
- Padding: horizontal md (12px)

#### Status Indicators

- Pending: Gray
- Submitted: Amber
- Received: Emerald
- Late: Red

### Owner App (Desktop-first)

#### Navigation

- Left sidebar with expandable sections
- Top header with user profile and notifications

#### Dashboard Widgets

- Card-based layout
- Equal height rows
- Grid system with 12 columns
- Gap: md (12px)

#### Tables

- Zebra striping (alternate row colors)
- Sticky headers
- Pagination (10 items per page)
- Sorting controls
- Row hover state

#### Modals

- Centered on screen
- Backdrop overlay
- Close button in top-right
- Action buttons aligned right in footer

## Responsive Breakpoints

```
xs: 0px (default)
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## Accessibility Guidelines

- Minimum contrast ratio: 4.5:1 for normal text
- Focus states for all interactive elements
- Alt text for all images
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support

## Icons

- Use Heroicons library
- Size: 24px (default), 20px (small)
- Color matches text color unless specified

## Animation

- Duration: 200ms
- Easing: ease-in-out
- Use for:
  - Page transitions
  - Button hover/active states
  - Form feedback
  - Notifications

## Layout Guidelines

### Tenant App

- Single column layout
- Max width: 480px (centered on larger screens)
- Padding: horizontal lg (16px)
- Content sections separated by xl (24px) margin

### Owner App

- Multi-column layout
- Sidebar: 240px fixed width
- Main content: Fluid
- Max width: 1440px (centered on larger screens)
- Padding: horizontal xl (24px)
- Content sections separated by 2xl (32px) margin 
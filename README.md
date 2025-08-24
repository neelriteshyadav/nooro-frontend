<!-- @format -->

# Todo Frontend

Next.js frontend for the Todo List application with TypeScript and Tailwind CSS.

## Features

- ✅ Modern, responsive UI design
- 🎨 Color-coded task management
- 📱 Mobile-first responsive design
- 🔄 Real-time task updates
- 🚀 TypeScript for type safety
- 🎯 Tailwind CSS for styling

## Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see backend README)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Note:** The backend must be running on port 3001 for the frontend to work.

### 3. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000`

## Application Structure

### Pages

- **Home (`/`)** - Main task list with summary and create button
- **Create (`/create`)** - Form to create new tasks
- **Edit (`/edit/[id]`)** - Form to edit existing tasks

### Components

- **TaskCard** - Individual task display with actions
- **TaskForm** - Reusable form for creating/editing tasks

### Features

#### Task Management

- ✅ Create new tasks with title and color
- ✏️ Edit existing tasks
- 🗑️ Delete tasks with confirmation
- 🔄 Toggle completion status
- 🎨 6 color options (red, blue, green, yellow, purple, pink)

#### User Experience

- 📱 Fully responsive design
- 🎯 Intuitive navigation
- ⚡ Real-time updates
- 🔒 Form validation
- 💾 Unsaved changes protection

## Design System

### Colors

The application uses a carefully selected color palette:

- **Primary**: Blue shades for main actions
- **Task Colors**: 6 distinct colors for task categorization
- **Status Colors**: Green for completed, gray for pending
- **Semantic Colors**: Red for errors, green for success

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: Bold, large text for hierarchy
- **Body**: Medium weight for readability

### Components

#### Buttons

- **Primary**: Blue background for main actions
- **Secondary**: Gray background for secondary actions
- **Danger**: Red background for destructive actions

#### Cards

- **Task Cards**: Hover effects and smooth transitions
- **Form Cards**: Clean, focused design
- **Summary Cards**: Information-dense layout

#### Forms

- **Input Fields**: Focus states with ring indicators
- **Color Picker**: Visual color selection grid
- **Validation**: Real-time error feedback

## API Integration

The frontend communicates with the backend through a RESTful API:

### Endpoints Used

- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update existing task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle completion

### Error Handling

- Network error detection
- User-friendly error messages
- Retry mechanisms for failed requests

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
app/
├── create/          # Create task page
├── edit/[id]/       # Edit task page (dynamic)
├── globals.css      # Global styles
├── layout.tsx       # Root layout
└── page.tsx         # Home page

components/           # Reusable components
├── TaskCard.tsx     # Task display component
└── TaskForm.tsx     # Task form component

lib/                  # Utility libraries
├── api.ts           # API client

types/                # TypeScript definitions
└── task.ts          # Task-related types
```

### Styling

The application uses Tailwind CSS with custom component classes:

```css
@layer components {
	.btn {
		/* Button base styles */
	}
	.btn-primary {
		/* Primary button styles */
	}
	.card {
		/* Card component styles */
	}
	.task-card {
		/* Task card styles */
	}
	.input {
		/* Input field styles */
	}
}
```

## Responsive Design

### Breakpoints

- **Mobile**: < 640px - Single column layout
- **Tablet**: 640px - 1024px - Optimized spacing
- **Desktop**: > 1024px - Full layout with hover effects

### Mobile Optimizations

- Touch-friendly button sizes
- Swipe-friendly interactions
- Optimized spacing for small screens

## Performance Features

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js built-in image optimization
- **Lazy Loading**: Components load on demand
- **Efficient Re-renders**: React optimization with proper state management

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: ES2020, CSS Grid, Flexbox

## Accessibility

- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Management**: Clear focus indicators

## Testing

The application is designed to be easily testable:

- **Component Isolation**: Components are self-contained
- **Props Interface**: Clear component contracts
- **State Management**: Predictable state updates
- **Error Boundaries**: Graceful error handling

## Deployment

### Build Process

1. Run `npm run build`
2. The `out/` directory contains the static build
3. Deploy to any static hosting service

### Environment Variables

Set production environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### Recommended Hosting

- **Vercel**: Native Next.js support
- **Netlify**: Static site hosting
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting for open source

## Troubleshooting

### Common Issues

1. **API Connection Failed**

   - Ensure backend is running on port 3001
   - Check CORS configuration
   - Verify API URL in environment

2. **Build Errors**

   - Clear `.next` directory
   - Reinstall dependencies
   - Check TypeScript errors

3. **Styling Issues**
   - Verify Tailwind CSS is properly configured
   - Check PostCSS configuration
   - Ensure CSS imports are correct

### Development Tips

- Use browser dev tools for debugging
- Check console for API request logs
- Verify environment variables are loaded
- Test responsive design on different screen sizes

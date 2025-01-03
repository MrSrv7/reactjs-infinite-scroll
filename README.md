# Infinite Scrolling

## Description

This app provides a custom React hook to implement infinite scrolling functionality. It enables seamless content loading as users scroll, optimizing performance and enhancing user engagement. Ideal for social media feeds, product listings, or any application requiring continuous data loading.

## Features

- Custom React hook (`useInfiniteScroll`) for easy integration.
- Performance optimization with throttling and lazy loading.
- Handles API calls, loading states, and error scenarios.
- Lightweight and reusable.

## Installation

### Prerequisites

- `Node.js` and `pnpm` installed.
- Basic knowledge of `ReactJS`.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/MrSrv7/reactjs-infinite-scroll
   ```

2. Navigate to the project directory:
   ```bash
   cd reactjs-infinite-scroll
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Start the development server:
   ```bash
   pnpm start
   ```

## Usage

### Import and Use the Hook

```javascript
import {useInfiniteScroll} from './hooks';

const App = () => {
  const [data, setData] = useState([]);
  const { lastElementRef, isFetching } = useInfiniteScroll(fetchMoreData);

  const fetchMoreData = async () => {
    // Simulate an API call
    const newData = await new Promise(resolve => 
      setTimeout(() => resolve(["Item 1", "Item 2", "Item 3"]), 1000)
    );
    setData(prev => [...prev, ...newData]);
  };

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      <div ref={lastElementRef}></div>
      {isFetching && <p>Loading...</p>}
    </div>
  );
};

export default App;
```

## How It Works

1. **Scroll Event Listener**: Monitors user scroll behavior and triggers the hook when the bottom of the page/container is reached.
2. **API Fetching**: Fetches additional content from an API and updates the state.
3. **DOM Update**: Dynamically appends new content to the page, ensuring a seamless user experience.

## Key Considerations

- **Performance**: Use throttling or debouncing to optimize scroll event handling.
- **Fallbacks**: Provide a "Load More" button for accessibility or as a backup.
- **Error Handling**: Ensure robust error handling for API failures.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
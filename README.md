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

## Custom Hook

`hooks/useInfiniteScroll.js:`

```javascript
import { useRef, useState } from "react";

const useInfiniteScroll = (onIntersect) => {
  const [loading, setLoading] = useState(false);
  const intersectionObserver = useRef();

  const targetRef = (element) => {
    if (intersectionObserver.current) intersectionObserver.current.disconnect();

    intersectionObserver.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setLoading(true);
        onIntersect().finally(() => setLoading(false));
      }
    });

    if (element) intersectionObserver.current.observe(element);
  };

  return { targetRef, loading };
};

export default useInfiniteScroll;
```

## Explanation

The `useInfiniteScroll` hook is a custom React hook that implements infinite scrolling functionality using the Intersection Observer API.

1. **State Management**
   - Uses `useState` to track loading state
   - Uses `useRef` to maintain a reference to the IntersectionObserver instance

2. **Intersection Observer**
   - Creates a new IntersectionObserver when a target element is provided
   - Automatically disconnects previous observers to prevent memory leaks
   - Triggers the `onIntersect` callback only when:
     - The target element is intersecting with the viewport
     - The component is not currently loading data

3. **Automatic Cleanup**
   - Disconnects the observer when the target element changes
   - Manages loading state automatically

### Parameters
- `onIntersect`: A callback function that is executed when the target element becomes visible in the viewport.

### Returns
- `targetRef`: A ref callback to attach to the last element in your list
- `loading`: A boolean state indicating whether data is currently being loaded

## Usage

### Import and Use the Hook

```javascript
import { useInfiniteScroll } from "./hooks";

const App = () => {
  const [data, setData] = useState([]);
  const { lastElementRef, isFetching } = useInfiniteScroll(fetchMoreData);

  const fetchMoreData = async () => {
    // Simulate an API call
    const newData = await new Promise((resolve) =>
      setTimeout(() => resolve(["Item 1", "Item 2", "Item 3"]), 1000)
    );
    setData((prev) => [...prev, ...newData]);
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

## Key Considerations

- **Performance**: Use throttling or debouncing to optimize scroll event handling.
- **Fallbacks**: Provide a "Load More" button for accessibility or as a backup.
- **Error Handling**: Ensure robust error handling for API failures.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

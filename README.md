# Infinite Scroll Products Application

Welcome to the **Infinite Scroll Products** application! This project is a React application that showcases an infinite scroll feature with product cards, providing a seamless and enjoyable browsing experience. The application also includes a pagination feature after a certain limit of products is reached.

## Features

- **Infinite Scroll**: Automatically loads more products as the user scrolls down the page.
- **Pagination**: Once 200 products are loaded, a pagination component allows users to navigate between pages.
- **Product Cards**: Each product is displayed in a card format, including:
  - Product Image
  - Product Name
  - Price
  - Description
- **Responsive Design**: The application is designed to look great on all devices.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Adds type safety to the application.
- **Axios**: Handles API requests to fetch product data.
- **CSS**: Custom styles for creating a visually appealing UI.

## How to Run the Application

To get started, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/mosharif30/Infinite-Scroll.git
   cd Infinite-Scroll
   ```

2. **Install Dependencies**

   Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

3. **Start the Application**

   Start the development server by running:

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000` in your browser.


## Folder Structure

- **`src/App.tsx`**: The main component implementing infinite scroll and pagination features.
- **`src/useInfiniteScroll.tsx`**: A custom hook used to handle infinite scrolling logic.
- **`src/App.css`**: Styles for the application to create a visually appealing product layout.


## How It Works

1. **Infinite Scrolling**: The application uses a custom hook, `useInfiniteScroll`, to track the user's scroll position. When the user scrolls near the bottom of the page, more products are fetched and added to the list.

2. **Pagination**: Once 200 products (10 pages) are loaded, the infinite scrolling stops, and a pagination component appears, allowing users to navigate between different pages of products.

3. **Product Display**: Each product is displayed in a card format with its name, image, price, and description, providing a clean and informative interface.

## Future Improvements

- **Loading Indicator**: Add a loading spinner while new products are being fetched.
- **Error Handling**: Display user-friendly error messages in case of API failures.
- **Search and Filter**: Implement search and filter functionality to enhance user experience.

## Contributing

If you would like to contribute to this project, feel free to create a pull request or open an issue on GitHub. Contributions are always welcome!



## Contact

If you have any questions or suggestions, feel free to reach out:

- **GitHub**: [mosharif30](https://github.com/mosharif30)

Happy scrolling!

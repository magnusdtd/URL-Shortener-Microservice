# URL Shortener Microservice

This is the URL Shortener Microservice project. Instructions for building project can be found at [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice).

## Introduction

This project is part of the freeCodeCamp backend development challenges. The URL Shortener Microservice allows users to shorten long URLs into more manageable, compact links. This service is particularly useful for sharing links on social media, emails, or any platform where space is limited.

## User Stories

1. **POST** a URL to `[project_url]/api/shorturl` and receive a JSON response with `original_url` and `short_url`.
2. **GET** `short_url` to be redirected to the original URL.

## Example Usage

- **POST** a URL:
    ```bash
    curl -X POST -d "url=https://www.example.com" [project_url]/api/shorturl
    ```
    Response:
    ```json
    {
      "original_url": "https://www.example.com",
      "short_url": "2Sg3wH"
    }
    ```

- **GET** the shortened URL:
    ```bash
    curl [project_url]/api/shorturl/2Sg3wH
    ```
    Redirects to `https://www.example.com`.

## Technologies Used

- **Backend**: Node.js, Express.js

## Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/url-shortener-microservice.git
    ```
2. Navigate to the project directory:
    ```bash
    cd url-shortener-microservice
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Running the Application
1. Start the application:
    ```bash
    npm run watch
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

- **POST /api/shorturl**: Shorten a new URL.
- **GET /api/shorturl/:short_url**: Redirect to the original URL.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact [my email](mailto:tdat0306@gmail.com).

```
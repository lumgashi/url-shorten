<body>
  <h1>URL Shortener Backend</h1>

  <p>This is a backend application built with <strong>NestJS</strong>, <strong>MongoDB</strong>, and <strong>Prisma</strong>. The application provides a simple service to shorten URLs with expiration functionality.</p>

  <h2>Endpoints</h2>
  <ol>
    <li>
      <strong>POST:</strong> <code>http://localhost:5000/api/urls/shorten</code>
      <p><strong>Description:</strong> Creates a shortened URL with a specified expiration time.</p>
      <p><strong>Request Body:</strong></p>
      <pre>
{
  "original_url": "string",  // The original URL to be shortened
  "ttl": "number"           // Time to live in milliseconds
}
      </pre>
    </li>
    <li>
      <strong>GET ONE:</strong> <code>http://localhost:5000/api/urls/:urlID</code>
      <p><strong>Description:</strong> Retrieves a single shortened URL document by its ID.</p>
      <p><strong>Parameters:</strong></p>
      <ul>
        <li><code>urlID</code>: The unique identifier of the shortened URL.</li>
      </ul>
    </li>
    <li>
      <strong>DELETE:</strong> <code>http://localhost:5000/api/urls/:urlID</code>
      <p><strong>Description:</strong> Deletes a single shortened URL document by its ID.</p>
      <p><strong>Parameters:</strong></p>
      <ul>
        <li><code>urlID</code>: The unique identifier of the shortened URL.</li>
      </ul>
    </li>
    <li>
      <strong>GET ALL:</strong> <code>http://localhost:5000/api/urls/</code>
      <p><strong>Description:</strong> Retrieves all shortened URL documents.</p>
    </li>
  </ol>

  <h2>Setup</h2>
  <ol>
    <li>
      Clone the repository:
      <pre><code>git clone https://github.com/lumgashi/url-shorten.git</code></pre>
    </li>
    <li>
      Navigate to the project directory:
      <pre><code>cd url-shorten</code></pre>
    </li>
    <li>
      Install dependencies:
      <pre><code>npm install</code></pre>
    </li>
    <li>
      <p>Attached to the email you'll find the .env file</p>
      Create a <code>.env</code> file in the root of the project with the following variables:
      <p><b>NOTE : the app won't start if the .env file isn't provided, please make sure to download the .env file sent from my email and place it in the root of the project</p>
      <pre>
DATABASE_URL="your-mongodb-url"
CLIENT_BASE_URL=http://localhost:5173/short-url
      </pre>
    </li>
    <li>
      Generate Prisma Schema:
      <pre><code>npx prisma generate</code></pre>
    </li>
    <li>
      Start the application in dev mode:
      <pre><code>npm run start:dev</code></pre>
    </li>
        <li>
          The application runs on PORT <b>5000
        </li>
  </ol>

  <h2>Technologies Used</h2>
  <ul>
    <li><strong>NestJS:</strong> Backend framework for building scalable server-side applications.</li>
    <li><strong>MongoDB:</strong> NoSQL database for storing URL data.</li>
    <li><strong>Prisma:</strong> ORM for database interaction.</li>
  </ul>
</body>
</html>

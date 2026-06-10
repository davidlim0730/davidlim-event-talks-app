
const fs = require('fs');
const path = require('path');

const scriptContent = fs.readFileSync(path.join(__dirname, 'src', 'script.js'), 'utf8');
const styleContent = fs.readFileSync(path.join(__dirname, 'src', 'style.css'), 'utf8');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Technical Talks Event Schedule</title>
    <style>
        ${styleContent}
    </style>
</head>
<body>
    <div class="container">
        <h1>Technical Talks Event Schedule</h1>

        <div class="search-container">
            <input type="text" id="category-search" placeholder="Search by category...">
        </div>

        <div id="schedule">
            <!-- Schedule will be dynamically loaded here by JavaScript -->
        </div>

        <footer>
            <p>&copy; 2024 Technical Talks Event</p>
        </footer>
    </div>

    <script>
        ${scriptContent}
    </script>
</body>
</html>
`;

fs.writeFileSync('index.html', htmlContent);
console.log('index.html generated successfully!');

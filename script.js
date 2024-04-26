console.log('====================================');
console.log("Connected");
console.log('====================================');
// Fetch product data from API
fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json')
    .then(response => response.json())
    .then(data => {
        const product = data.product;
        // Display product details
        document.getElementById('product-image').src = product.images[0].src;
        document.getElementById('product-vendor').textContent = product.vendor;
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('price').textContent = product.price;
        document.getElementById('compare-at-price').textContent = product.compare_at_price;
        
        // Calculate percentage off
        const price = parseFloat(product.price.replace('$', ''));
        const comparePrice = parseFloat(product.compare_at_price.replace('$', ''));
        const percentageOff = ((comparePrice - price) / comparePrice * 100).toFixed(0);
        document.getElementById('percentage-off').textContent = `${percentageOff}% off`;
        // Display thumbnails
        const images = product.images.slice(0, 4); // Display only first four images

        // Update product image
        const productImage = document.getElementById('product-image');
        productImage.src = images[0].src;

        // Update thumbnails
        const thumbnailsContainer = document.getElementById('thumbnails');
        images.forEach(image => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image.src;
            thumbnail.alt = 'Thumbnail';
            thumbnail.classList.add('thumbnail');
            thumbnailsContainer.appendChild(thumbnail);

            // Add event listener to change main image on thumbnail click
            thumbnail.addEventListener('click', () => {
                productImage.src = image.src;
            });
        });
        // Display color variants
        const colorSelector = document.getElementById('color-selector');

        product.options[0].values.forEach(color => {
            const colorName = Object.keys(color)[0];
            const colorOption = document.createElement('div');
            colorOption.classList.add('color-option');
            colorOption.style.backgroundColor = color[colorName]; // Set background color
            colorOption.title = colorName;
        
            colorOption.addEventListener('click', () => {
                console.log('Clicked color:', colorName); // Log the clicked color
        
                // Check if the clicked color option is already selected
                if (colorOption.classList.contains('selected')) {
                    // Deselect the color option
                    colorOption.classList.remove('selected');
                    colorOption.style.border = '1px solid transparent'; // Reset border color
                    colorSelector.dataset.selectedColor = ''; // Clear the selected color dataset
                } else {
                    // Remove border from previously selected color option
                    const prevSelected = document.querySelector('.color-option.selected');
                    if (prevSelected) {
                        console.log('Previous selected color:', prevSelected.title); // Log the previously selected color
                        prevSelected.classList.remove('selected');
                        prevSelected.style.border = '1px solid transparent'; // Reset border color
                    }
        
                    // Apply border to the clicked color option
                    colorOption.classList.add('selected');
                    colorOption.style.border = '.2rem solid black'; // Apply border color
        
                    // Store the selected color name
                    colorSelector.dataset.selectedColor = colorName;
                }
            });
        
            colorSelector.appendChild(colorOption);
        });
        
        
        

        // To give border
 

        // Display size variants
        const sizeSelector = document.getElementById('size-selector');
product.options[1].values.forEach(size => {
    const sizeOption = document.createElement('input');
    sizeOption.type = 'radio';
    sizeOption.name = 'size';
    sizeOption.value = size;

    const label = document.createElement('label');
    label.textContent = size;

    const sizeContainer = document.createElement('div');
    sizeContainer.classList.add('size-option'); // Add class to each size container
    sizeContainer.appendChild(sizeOption);
    sizeContainer.appendChild(label);

    sizeSelector.appendChild(sizeContainer);
});
const counterButton = document.getElementById("counterButton");
const counterValue = document.getElementById("counterValue");
const minusButton = document.getElementById("minusButton");
let count = 1;

counterButton.addEventListener("click", () => {
    count++;
    counterValue.textContent = count;
    minusButton.disabled = false; // Enable the minus button when count is incremented
});

minusButton.addEventListener("click", () => {
    if (count > 1) {
        count--;
        counterValue.textContent = count;
        if (count === 1) {
            minusButton.disabled = true; // Disable the minus button when count is 1
        }
    }
});



        // Add to cart button functionality
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        addToCartBtn.addEventListener('click', () => {
            const selectedColor = colorSelector.dataset.selectedColor;
            const selectedSize = document.querySelector('input[name="size"]:checked');
            const quantity = count;
            const addToCartMessage = document.getElementById('add-to-cart-message');
            addToCartMessage.style.display = 'block';
                const message =`${quantity} ${product.title} with Color ${selectedColor} and Size ${selectedSize.value} added to cart`;
                document.getElementById('add-to-cart-message').textContent = message;
        });
        // Display description
        document.getElementById('description').innerHTML = product.description;
    })
    .catch(error => console.error('Error fetching product data:', error));

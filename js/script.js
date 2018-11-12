const studentList = document.querySelectorAll('.student-item');
const pageItemsLimit = 10;

// When HTML content is loaded initialize the page links and
// simulate a click on page 1 to make the link active
window.addEventListener("DOMContentLoaded", () => {
    appendPageLinks(studentList);
    searchStudent();
    document.querySelector(".pagination a").click();
});

const showPage = (list, pageNo, pageItemsLimit) => {
    // Hide all students
    list.forEach(item => {
        item.style.display = 'none';
    });

    // Display items on page depending on the arguments passed in
    const startIndex = (pageNo * pageItemsLimit) - pageItemsLimit;
    const endIndex = (startIndex + pageItemsLimit);

    for(let i = startIndex; i < endIndex; i++){
            if(i < list.length){
                list[i].style.display = 'block';
            }
    }
};

const appendPageLinks = (list) => {
    // Round UP to nearest int in order to display all items
    const numOfPageLinks = Math.ceil(list.length / pageItemsLimit);

        // To prevent the pageLink elements to be re-added on search the 'pagination' div is removed
        if(document.querySelector('.pagination') !== null){
            const pagination = document.querySelector('.pagination');
            pagination.parentNode.removeChild(pagination);
        }

        // add a div and ul to hold the list of page-links.
        const paginationDiv = document.createElement('div');
        const ul = document.createElement('ul');
        document.querySelector('.page').appendChild(paginationDiv);
        paginationDiv.appendChild(ul);
        paginationDiv.classList.add('pagination');

    for(let i = 0; i < numOfPageLinks; i++){
        // Create x amount of page-link elements
        const li = document.createElement('li');
        const a = document.createElement('a');
        ul.appendChild(li);
        li.appendChild(a);

        a.href = '#';
        a.innerHTML = i + 1;
        a.addEventListener('click', (e) => {
           handlePageClick(e, list);
        });
    }
};

const handlePageClick = (e, list) => {
    // Get pageNum value from innerHTML and use as argument in showPage func
    const clickedPageNum = e.target.innerHTML;
    showPage(list, clickedPageNum, pageItemsLimit);

    // Set active class on clicked element
    const currentActive = document.querySelector('.active');
    if(currentActive !== null){
        currentActive.classList.remove('active');
    }
    e.target.className = 'active';
};

const searchStudent = () => {
    // Add markup for search input
    document.querySelector('.page-header').innerHTML += `
        <div class="student-search">
          <input placeholder="Search for students...">
          <button>Search</button>
        </div>
    `;

    document.querySelector('.student-search button').addEventListener('click', (handleSearchInput));
    document.querySelector('.student-search input').addEventListener('keyup', (handleSearchInput));
};

const handleSearchInput = () => {
    const inputField = document.querySelector('.student-search input');
    const studentNames = document.querySelectorAll('.student-details h3');
    const studentItems = document.querySelectorAll('.student-item');
    const searchTerm = inputField.value.toLowerCase();
    const searchResults = [];

    // Loop through all the studentItems and add the filtered items to a new array 'searchResults'
    for (let i = 0; i < studentItems.length; i++) {
        let name = studentNames[i].innerHTML.toLowerCase();
        if (name.indexOf(searchTerm) !== -1) {
            searchResults.push(studentItems[i]);
        } else {
            studentItems[i].style.display = 'none';
        }
    }
    // Use the new array as arguments in the 'appendPageLinks' and 'showPage' to handle the visibility and page items
    appendPageLinks(searchResults);
    showPage(searchResults, 1, pageItemsLimit);
};




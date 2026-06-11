/*Categories
    business
    entertainment
    politics
    sport
    tech

*/

import newsData from "./newsData.js";

const filterDiv = document.getElementsByClassName('filter-div')[0];
const newsDiv = document.getElementsByClassName('news-div')[0];
const showMoreBtn = document.getElementById('show-btn')
let currentType = null;
const searchBar  = document.getElementById('search-bar');
let currentNews = null;

const parseDate = (dateStr) => {
    const [datePart, timePart] = dateStr.split(", ");

    const [day, month, year] = datePart.split("/").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);

    return new Date(year, month - 1, day, hour, minute, second);
};

const filterNews = (word) => {
    const searchWord = word.trim().toLowerCase();

    let filteredNews = currentNews;

    if (searchWord) {
        filteredNews = currentNews.filter(news =>
            news.title.toLowerCase().includes(searchWord)
        );
    }

    newsDiv.innerHTML = '';

    filteredNews.forEach((news) => {
        const newDiv = document.createElement('div');
        const title = document.createElement('h2');
        const date = document.createElement('p');
        const newsDescription = document.createElement('p');

        if (searchWord) {
            const escaped = searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            title.innerHTML = news.title.replace(
                new RegExp(`(${escaped})`, 'gi'),
                '<mark>$1</mark>'
            );
        } else {
            title.innerText = news.title;
        }

        date.innerText = news.dateAndTime;
        newsDescription.innerText = news.content;

        newDiv.classList.add('news');
        newDiv.append(title, date, newsDescription);

        newsDiv.append(newDiv);
    });
};

const searchFunction = () => {
  const searchedWord = searchBar.value;
  
    filterNews(searchedWord);

}

const debouncer = (func, timeout) => {
  let timer;
  
  return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), timeout);
  }
    
}

searchBar.addEventListener('input',debouncer(searchFunction, 1000));

const displayNews = (category, limit) => {
    let categoryNews = newsData;
    if(category !== 'all')
        categoryNews = newsData.filter((news) => news.category === category);

    const sortedNews = categoryNews.sort((news1, news2) => {
        return parseDate(news2.dateAndTime) - parseDate(news1.dateAndTime);
    });


    const displayNews = (limit > 0) ? sortedNews.slice(0, limit) : sortedNews;

    newsDiv.innerHTML = '';

    currentNews = displayNews;

    displayNews.forEach((news) => {
        const newDiv = document.createElement('div');
        const title = document.createElement('h2');
        const date = document.createElement('p');
        const newsDescription = document.createElement('p');

        title.innerText = news.title;
        date.innerText = news.dateAndTime;
        newsDescription.innerText = news.content;

        newDiv.classList.add('news')

        newDiv.append(title, date, newsDescription);

        newsDiv.append(newDiv);
    })
}

const displayCategory = (event) => {
    const mainCategory = event.target.innerText;

    const categoryButtons = document.querySelectorAll(".filter-div > button");
    categoryButtons.forEach((category) => {
        if(category.innerText !== mainCategory) 
            category.classList.remove('highlight-button');
        else category.classList.add('highlight-button');

        
    })

    displayNews(mainCategory.toLowerCase(), 7);

}

const findCategories = () => {
    const categories = ["All"];

    newsData.forEach((news) => {
        if(!categories.find((category) => category === news.category)) 
            categories.push(news.category)
    })

    return categories;
}

const addCategories = async () => {
    const categories = findCategories();

    let allButton = null;

    await categories.forEach((category) => {
        let formatName = category[0].toUpperCase();
        formatName += category.slice(1);

        const categoryButton = document.createElement('button');
        categoryButton.innerText = formatName;
        categoryButton.classList.add("category-button")

        categoryButton.addEventListener('click', displayCategory);
        filterDiv.append(categoryButton);

        if (category === 'All') {
            allButton = categoryButton;
        }

    })

    allButton?.click();
    
}

showMoreBtn.addEventListener('click', () => {
    const categoryButtons = document.querySelectorAll(".filter-div > button");
    let mainCategory = null;
    categoryButtons.forEach((category) => {
        if(category.classList.contains('highlight-button'))
            mainCategory = category.innerText;
    })

    displayNews(mainCategory.toLowerCase(), 0);
})

addCategories();
const axios = require('axios').default
const cheerio = require('cheerio')
const Book = require('../models/Book')


// 获取豆瓣读书的源代码
async function getBooksHtml(params) {
    const res = await axios.get('https://book.douban.com/latest')
    return res.data
}

// 从网页中得到所有书籍的信息,得到一个书籍数组
async function getBooksLinks() {
    const html = await getBooksHtml()
    const $ = cheerio.load(html)
    const aElements = $('#content .chart-dashed-list li .media__img a')
    const links = aElements.map((i, e) => {
        const href = e.attribs['href']
        return href
    }).get()
    return links
}

// 根据书籍详情页链接得到该书籍的详细信息
async function getBookDetail(url) {
    const res = await axios.get(url)
    const $ = cheerio.load(res.data)
    const name = $('h1').text().trim()
    const imgurl = $('#mainpic .nbg img').attr('src')
    const spans = $('#info span.pl')

    const authorSpan = spans.filter((i, e) => {
        return $(e).text().includes('作者')
    })
    const author = authorSpan.next('a').text()

    const publishSpan = spans.filter((i, e) => {
        return $(e).text().includes('出版年')
    })
    const publishDate = publishSpan[0].nextSibling.nodeValue.trim()

    return {
        name,
        imgurl,
        author,
        publishDate
    }

}

// 得到所有处理好之后的书籍对象
async function fetchAll() {
    const links = await getBooksLinks()
    const proms = links.map((links) => {
        return getBookDetail(links)
    })
    return Promise.all(proms)
}

// 存数据库
async function saveTodb() {
    // const books = await fetchAll()
    // console.log(books);

    Book.bulkCreate(books).then(() => {
        console.log('数据抓取成,数据库所有书籍添加成功');
    })
}


saveTodb()

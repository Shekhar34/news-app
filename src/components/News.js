import React,{useEffect,useState} from 'react'

import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




const News =(props)=> {
  const [articles,setArticles]=useState([]);
  const [loading ,setLoading]=useState(true);
  const [page,setPage]=useState(1);
  const [totalResults,setTotalResults]=useState(0);


  const updateNews= async ()=>{
    props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c76f35a40e4c45eaba237801eb3b0217&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data=await fetch(url); 
    props.setProgress(30);
    let parsedata=await data.json();
    props.setProgress(70);
    setArticles(parsedata.articles)
    setTotalResults(parsedata.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(()=>{
    updateNews();
  },[])


const handlePrevClick=  async ()=>{

  setPage(page-1)
  updateNews();
  }

 const handleNextClick=  async ()=>{
 setPage(page +1)
  updateNews();

  }

  const fetchMoreData = async () => {
    setPage(page +1)
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c76f35a40e4c45eaba237801eb3b0217&page=${this.state.page}&pageSize=${props.pageSize}`;
    let data=await fetch(url); 
    let parsedata=await data.json();
    setArticles(articles.concat(parsedata.articles))
    setTotalResults(parsedata.totalResults)
    };
  
  
    return (
      <div className='container my-3'>
        <h1 className="text-center">News Monkey- Top Headlines</h1>

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<h4>Loading...</h4>}
        >
      <div className="container">

    
        <div className="row">
        {articles.map((element)=>{
            return    <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
        })}
            
            </div>
        </div>

        </InfiniteScroll>
   
      </div>
    )
  }


News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.PropType={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
export default News

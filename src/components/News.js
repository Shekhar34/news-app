import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

    static PropType={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string,
    }
  constructor(){
    super();
    console.log("hii am constructor from news component");
    this.state={
      articles:[],
      loading :false,
      page:1,
      totalResults:0
    }
  }

  async updateNews(){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c76f35a40e4c45eaba237801eb3b0217&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data=await fetch(url); 
    let parsedata=await data.json();
    console.log(parsedata);
    this.setState({articles:parsedata.articles,totalResults:parsedata.totalResults})
   
  }

  async componentDidMount(){

    this.updateNews();
  }



handlePrevClick=  async ()=>{

  this.setState({page:this.state.page -1});
  this.updateNews();
  }

 handleNextClick=  async ()=>{
  
  this.setState({page:this.state.page +1});
  this.updateNews();

  }

  fetchMoreData = async () => {
    this.setState({page:this.state.page+1})
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c76f35a40e4c45eaba237801eb3b0217&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data=await fetch(url); 
    let parsedata=await data.json();
    console.log(parsedata);
    this.setState({articles:this.state.articles.concat(parsedata.articles),totalResults:parsedata.totalResults})
    };
  
  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center">News Monkey- Top Headlines</h1>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
      <div className="container">

    
        <div className="row">
        {this.state.articles.map((element)=>{
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
}

export default News

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
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
      page:1
    }
  }

  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c76f35a40e4c45eaba237801eb3b0217&pageSize=${this.props.pageSize}`;
    let data=await fetch(url); 
    let parsedata=await data.json();
    console.log(parsedata);
    this.setState({articles:parsedata.articles,totalResults:parsedata.totalResults})
  }

handlePrevClick=  async ()=>{
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c76f35a40e4c45eaba237801eb3b0217&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  let data=await fetch(url); 
  let parsedata=await data.json();
  console.log(parsedata);

 
  this.setState({
    page:this.state.page-1,
    articles:parsedata.articles
   })
  }

 handleNextClick=  async ()=>{
  if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){

  }
  else{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=c76f35a40e4c45eaba237801eb3b0217&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    let data=await fetch(url); 
    let parsedata=await data.json();
    console.log(parsedata);

   
    this.setState({
      page:this.state.page+1,
      articles:parsedata.articles
     })
    }
  }
  
  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center">News Monkey- Top Headlines</h1>
        <div className="row">
        {this.state.articles.map((element)=>{
            return    <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
        })}
            
           
        </div>
        <div className="d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News

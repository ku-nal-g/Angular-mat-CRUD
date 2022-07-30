import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NewsApiService } from 'src/app/services/news-api.service';

@Component({
  selector: 'app-news-data',
  templateUrl: './news-data.component.html',
  styleUrls: ['./news-data.component.scss']
})
export class NewsDataComponent implements OnInit {

  newsList:any = [];

  country:string = 'in';

  globalDateArray:any = [];
  localDateArray :any = [];

  constructor(private newsData:NewsApiService,private location:Location) { }

  ngOnInit(): void {
    this.getCountrDataFromApi(this.country);
  }

  getCountry(event:any){
    this.country = event.target.value;
    this.getCountrDataFromApi(this.country);
  }

  getCountrDataFromApi(country:string){
    this.newsData.get(this.country).subscribe((res)=>{
      this.newsList= res.articles;
      this.newsList.forEach((elem: any,index: any)=>{
        this.globalDateArray.push(this.newsList[index].publishedAt);
      })
      this.convertDate();
    },
    (error)=>{
      console.log("error has occured");
    })
  }

  convertDate(){
    this.globalDateArray.forEach((elem: any,index: any)=>{
      let d = new Date(this.globalDateArray[index]);
      this.localDateArray.push(d);
    })
  }

  goBack(){
    this.location.back();
  }
}

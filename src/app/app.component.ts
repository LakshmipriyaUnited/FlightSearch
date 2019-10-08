import { Component,OnInit } from '@angular/core';
import {SearchService} from './search.service';
import { Observable } from 'rxjs';
import {FormControl} from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchResult;
  finalResult=[];
   criteriacheck:Boolean=false;
  flightnumbercheck:Boolean=false;
  origincheck:Boolean=false;
  destcheck:Boolean=false;
 datecheck:Boolean=false;
 flightnumber:any;
 origin:any;
 dest:any;
 date1:any;
  constructor(private service:SearchService, private datePipe: DatePipe){

  }
  onSubmit(){
       
    if(this.date1 == undefined || this.date1 == '' ){
      this.datecheck=true;
      return 0;
     }
    
     else{
       this.datecheck = false;
     }
    if (this.flightnumber == undefined){
      if(this.origin == undefined && this.dest == undefined){
        this.criteriacheck = true;
        return 0;
      }
    }
      else{
        if(isNaN(this.flightnumber)){
          this.flightnumbercheck = true;
          return 0;
        }else{
          this.flightnumbercheck=false;

        }
        this.criteriacheck = false;
         
        }
     if(!this.criteriacheck && !this.flightnumbercheck && !this.datecheck){
      this.getsearchResult();
     }

  }
  getsearchResult(){
    var tempresult =this.service.getSearchResults()
    tempresult.subscribe(
      (data)=>{
     
        this.searchResult = data}
    );
    var query='';
    var query1='';
    if(this.flightnumber){
      query = ''
    }
    if(this.origin){
      query1 = 'data.origin == this.origin && data.destination == this.dest' 
    }
    query=query+'data.'
    var tempdate= this.datePipe.transform(this.date1, 'yyyy-MM-dd').toString();
    var temp1;
     temp1=this.searchResult.filter((data)=>
           data.arrival.substring(0,10) == tempdate
       
    );
    if(this.flightnumber){
      temp1=temp1.filter((data)=>
      (data['flightNumber'] == this.flightnumber)
      )
    }
    if(this.origin){
      temp1=temp1.filter((data)=>
        (data['origin'] == this.origin && data['destination'] == this.dest)
      );
    }

this.finalResult= temp1;
  
  }
  ngOnInit(){
    var tempresult =this.service.getSearchResults()
    tempresult.subscribe(
      (data)=>{
        console.log(data);
        this.searchResult = data}
    );

  }
}

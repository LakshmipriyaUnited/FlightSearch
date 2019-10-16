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
  finalResult:any[]=[];
   criteriacheck:Boolean=false;
  flightnumbercheck:Boolean=false;
  origincheck:Boolean=false;
  destcheck:Boolean=false;
 datecheck:Boolean=false;
 flightnumber:any;
 origin:any;
 dest:any;
 date1:any;
 submitindicator:Boolean= false;
  constructor(private service:SearchService, private datePipe: DatePipe){

  }
  onSubmit(){
    this.submitindicator= false;
    this.finalResult=[]; 
    this.datecheck = false;
    this.criteriacheck = false;
    this.flightnumbercheck = false;
    if(this.date1 == undefined || this.date1 == '' ){
      this.datecheck=true;
      return 0;
     }
    
     else{
       this.datecheck = false;
     }
    if (this.flightnumber == undefined || this.flightnumber == null){
      if(this.origin == undefined || this.dest == undefined || this.origin == '' || this.dest == '') {
        this.criteriacheck = true;
        return 0;
      }
    }
      else{
        this.criteriacheck = false;
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
    this.submitindicator= true;
    var tempresult =this.service.getSearchResults()
    tempresult.subscribe(
      (data)=>{
     
        this.searchResult = data}
    );
    
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
  /*  var tempresult =this.service.getSearchResults()
    tempresult.subscribe(
      (data)=>{
        console.log(data);
        this.searchResult = data}
    );*/

  }
}

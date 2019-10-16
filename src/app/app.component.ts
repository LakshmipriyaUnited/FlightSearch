import { Component,OnInit } from '@angular/core';
import {SearchService} from './search.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
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
                
        }
     if(!this.criteriacheck &&  !this.datecheck){
      this.getSearchResult();
     }

  }
   getSearchResult(){
 
      this.submitindicator= true;
      var tempdate= this.datePipe.transform(this.date1, 'yyyy-MM-dd').toString();
      var temp1= this.searchResult;
      temp1=temp1.filter((data)=>
            data.arrival.substring(0,10) == tempdate
        
      );
    if(this.flightnumber){
      if(temp1.length > 0){
        temp1=temp1.filter((data)=>
        (data['flightNumber'] == this.flightnumber)
        )
      }
      
    }
    if(this.origin && this.dest){
      temp1=temp1.filter((data)=>
        (data['origin'] == this.origin && data['destination'] == this.dest)
      );
    }

this.finalResult= temp1;
  this.flightnumber ='';
  this.origin ='';
  this.dest = '';
  this.date1='';
  
    
  }
   ngOnInit(){
  var tempresult =  this.service.getData()
    tempresult.subscribe(
      (data)=>{
     this.searchResult = data}
    );

  }
 
}

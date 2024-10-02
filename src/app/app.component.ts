import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'TP1-AppLastMusique';
  album?: string = '';
  result = false;
  artist?: string = "";
  albums: Album[]=[];
  chansons: Chanson[]=[];


  constructor (public httpClient: HttpClient){}

  async searchChansons():Promise<void>{
    this.result = true;
	
	// La requête HTTP devra être ajoutée ici 
	let x = await lastValueFrom (this.httpClient.get<any>("https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=8f630f1f91e115680f041428891d246b&artist=Cher&album=Believe&format=json"));
  console.log(x);
  for(let chanson of x.album.tracks.track ){
  let objChanson: Chanson = new Chanson (chanson.name)
    this.chansons.push(objChanson)
    
    }
   
    console.log(this.chansons);
    
  }

  newSearch():void{
    this.result = false;
  }
  
}
export class Album{


  constructor (public name:string, public image:string ){}
}
export class Chanson{


  constructor (public chansonName:string){}
}
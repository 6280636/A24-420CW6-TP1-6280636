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
    result = false;
    artist?: string = "";
    albums: Album[]=[];
    chansons: Chanson[]=[];

    constructor (public httpClient: HttpClient){}  

    async searchChansons(albumName: string):Promise<void>{
    this.chansons = [];    
    this.result = true;	
	
    let x = await lastValueFrom (this.httpClient.get<any>
    ("https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=8f630f1f91e115680f041428891d246b&artist=" 
    + this.artist + "&album="+ albumName + "&format=json"));
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

    async searchAlbums():Promise<void>{
    this.albums = [];
    this.result = true;	

    let a = await lastValueFrom (this.httpClient.get<any>
    ("https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="
      + this.artist + "&api_key=8f630f1f91e115680f041428891d246b&format=json"));
    
    console.log(a);
    for(let album of a.topalbums.album){
    let objAlbum: Album = new Album (album.name, album.image[2]["#text"])
    this.albums.push(objAlbum) 

      }

    console.log(this.albums); 

    }
  }
    export class Album{

    constructor (public nameAlbum:string, public imageAlbum:string ){}
    }
    export class Chanson{


    constructor (public chansonName:string){}
    }

import { Injectable } from '@angular/core';
import  { SocialSharing }  from "@ionic-native/social-sharing"



@Injectable({
  providedIn: 'root',
  
})
export class SocialSharingService {
  public socicalSharing = SocialSharing
  constructor() { 
  }
}

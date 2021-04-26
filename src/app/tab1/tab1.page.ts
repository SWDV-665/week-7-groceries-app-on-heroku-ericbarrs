import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { from } from 'rxjs';
import {GroceriesServiceService} from '../providers/groceries-service.service'
import { SocialSharingService } from '../providers/social-sharing.service'
import { Camera } from '@ionic-native/camera'





@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Grocery List"
  items = []
  
  constructor(
    public toastController: ToastController, 
    public alertController: AlertController,
    public dataService: GroceriesServiceService,
    public social: SocialSharingService
  ){
    this.items = dataService.getItems()
  }



  async prompted (message:string){
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async addQuantity(item:any, index:number){

    const Item = this.dataService.items[index]
    
    if(Item.quantity > 50){
      this.prompted(item.name + ' has reached max quantity')
      }

      Item.quantity += 1
      this.prompted(item.name + ' quantity is ' +  Item.quantity)
  }

  async shareItem(item:any, index:number){
    this.prompted('Sharing Item - ' + item.name)

    let message = "Grocery Item - Name: " + item.name + " -Quantity: " + item.quantity
    let subject = "Shared via Groceries app"
    this.social.socicalSharing
    .share(message, subject).then(()=>{
      console.log("Shared successfully!")
    }).catch((err)=> console.log(err))
  }

  async removeItem(item:any, index:number){
    const indexIem = this.dataService.items[index]
    const Item = this.dataService.items

    if(indexIem.quantity === 1){
      this.prompted(item.name + ' has been removed.')
      Item.splice(index,1)
    }
    else{
      this.prompted(item.name + ' quantity has decreased')
      indexIem.quantity -= 1
    }
  }

  async editItem(index){
    let item = this.dataService.items[index]
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit Item',
      subHeader: 'New Item',
      message: 'Edit a Shopping Item.',
      inputs:[
        {
        name:'name',
        placeholder:"Name",
        value: item.name
        },
        {
          name:'quantity',
          placeholder:'Quantity',
          value: item.quantity
        }
    ],
      buttons:[
        {
        text:"Cancel",
          handler: async () =>{
            this.prompted('Cancelled')
          }
        },
        {
          text:"Save",
            handler: async (newItem) =>{
              item = newItem
              this.prompted(item.name + ' has been updated.')
            }
        }
      ]

    });

    await alert.present();
  }

  async deleteItem(index){
    const Item = this.dataService.items

    const deletedItem:any = Item.splice(index,1)
    this.prompted(deletedItem[0].name + ' has been has been deleted.')
  }

  async addAlert() {
    
    let item = this.dataService.items
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Item',
      subHeader: 'New Item',
      message: 'Add a Shopping Item.',
      inputs:[{
        name:'Item',
        placeholder:"add Item"
      }],
      buttons:[
        {
        text:"Cancel",
          handler: async () =>{
            this.prompted('Cancelled')
          }
        },
        {
          text:"Add",
            handler: async (newItem) =>{
              let obj ={
                name:newItem.Item,
                quantity:1
              }
              item.unshift(obj)
              this.prompted(obj.name + ' has been added.')
            }
        }
      ]

    });

    await alert.present();
  }
}

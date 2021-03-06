import { Component } from '@angular/core';
import { NavController, NavParams , AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ProvideStorage } from '../../providers/providers';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-house-info-page',
  templateUrl: 'house-info-page.html',
})
export class HouseInfoPage {
  house: any;
  isFollowing = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public provideStorage: ProvideStorage,
    public alertController: AlertController,
    public toastController: ToastController,
    public socialSharing: SocialSharing,
    public loadingController: LoadingController) {}

  ionViewCanEnter() {
    this.house = this.navParams.data;
    if (this.house.listing.picture_urls.length > 5)
      this.house.listing.picture_urls = this.house.listing.picture_urls.slice(0, 5);
    this.provideStorage.isFavoriteHouse(this.house.listing.id)
    .then(val => this.isFollowing = val);
  }
  
  toggleFollow(){
    if (this.isFollowing) {
      let confirm = this.alertController.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              this.provideStorage.unfavoriteHouse(this.house.listing.id);

              let toast = this.toastController.create({
                message: 'You have unfollowed this house.',
                duration: 2000,
                position: 'bottom'
              });
              toast.present(); 
            }
          },
          { text: 'No' }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      this.provideStorage.favoriteHouse(this.house); 
    }
  } 

  shareImg() {
    let loader = this.loadingController.create({
      content: 'Processing...'
    })
    loader.present();
    this.socialSharing.share('Hello', 'blah blah', this.house.listing.picture_url, 'https://www.facebook.com/vietdoan.hp')
    .then(() => {
      loader.dismiss();
    });
  }
}

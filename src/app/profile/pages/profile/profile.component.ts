import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Chef, Cuisine, ServiceArea, Slot } from 'src/app/model/all-models';
import { LocationService } from 'src/app/services/location.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  onSearchServiceLocation() {
    throw new Error('Method not implemented.');
  }

  showServiceLocations: any;
  serviceLocationSearchText: any;
  searchLocation: any;
  errorMessage: any;
  leafView: string = undefined;
  cuisines: Cuisine[];
  slots: Slot[];


  destroy$ = new Subject<void>();

  minimumOrder: any;
  partyOrders: any;
  minimumPartyOrder: any;
  delivery: any;
  deliveryFee: any;
  packagingFee: any;
  deliveryDistance: any;
  freeDeliveryOver: any;
  activeLayout: string;
  subLayout: string;

  editPersonal: boolean = false;
  name: string = '';
  mobile: string = '';
  kitchenName: string = '';
  editAddress: boolean;
  editSlots: boolean;
  editCuisines: boolean;
  editLocations: boolean;
  editGeneral: boolean;
  editKitchen: boolean;
  serviceAreaSearchErrorMessage: any;
  serviceAreas: ServiceArea[];
  chef: Chef;

  constructor(private router: Router,
    private profileSvc: ProfileService,
    private utils: Utils,
    private locationSvc: LocationService
  ) { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.activeLayout = "Home";
    this.chef = this.profileSvc.getCurrentChef();
    console.log('Local chef: ' + JSON.stringify(this.chef))
    if (this.chef !== null && this.chef !== undefined) {
      this.profileSvc.getChef()
    } else {
      this.profileSvc.getChef().subscribe(e => {
        this.chef = e;
      });
    }
    this.fetchServiceLocations();
    this.fetchCuisines();
    this.fetchSlots();
  }

  private fetchServiceLocations() {
    let observable = this.locationSvc.fetchLocalAreas(undefined);
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.serviceAreas = data;
      },
      error: (err) => {
        console.error('Erros from reset submit.' + JSON.stringify(err));
        this.errorMessage = err.error.detail;
      },
    });
  }

  private fetchCuisines() {
    let observable = this.profileSvc.fetchAllCuisine();
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.cuisines = data;
      },
      error: (err) => {
        console.error('Erros while fetching cuisines.' + JSON.stringify(err));
        this.errorMessage = err.error.detail;
      },
    });
  }

  private fetchSlots() {
    let observable = this.profileSvc.fetchSlots();
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.slots = data;
      },
      error: (err) => {
        console.error('Erros while fetching slots.' + JSON.stringify(err));
        this.errorMessage = err.error.detail;
      },
    });
  }

  selectActiveLayout(main: string, sub: string) {
    this.activeLayout = main;
    this.subLayout = sub;
    if (main !== "Home") {
      this.leafView = main;
    } else {
      this.leafView = undefined;
    }
  }

  editData(type: string) {
    switch (type) {
      case 'Personal':
        this.editPersonal = true;
        break;
      case 'Address':
        this.editAddress = true;
        break;
      case 'Slots':
        this.editSlots = true;
        break;
      case 'Cuisines':
        this.editCuisines = true;
        break;
      case 'Locations':
        this.editLocations = true;
        break;
      case 'Kitchen':
        this.editKitchen = true;
        break;
    }

  }
  cancelEdit() {
    this.editPersonal = false;
    this.editAddress = false;
    this.editCuisines = false;
    this.editKitchen = false;
    this.editGeneral = false;
    this.editLocations = false;
    this.editSlots = false;
  }

  submitPersonal() {
    if (this.utils.isEmpty(this.chef.name)) {
      this.errorMessage = 'Name is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.chef.email)) {
      this.errorMessage = 'Email is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.chef.contact.mobile)) {
      this.errorMessage = 'Mobile is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.chef.kitchenName)) {
      this.errorMessage = 'Kitchen Name is mandatory';
      return;
    }
    this.updateChef();
  }

  removeLocation(_t146: ServiceArea) {
    for (var i = 0; i < this.chef.serviceAreas.length; i++) {
      var l = this.chef.serviceAreas[i];
      if (l._id === _t146._id) {
        this.chef.serviceAreas.splice(i, 1);
      }
    }
  }

  onSelectCuisine(_t244: Cuisine) {
    let found = false;
    for (var i = 0; i < this.chef.cuisines.length; i++) {
      var c = this.chef.cuisines[i];
      if (c._id === _t244._id) {
        found = true;
      }
    }
    if (!found) {
      this.chef.cuisines.push(_t244);
      this.updateChef();
    }

  }

  removeCuisine(_t252: Cuisine) {
    for (var i = 0; i < this.chef.cuisines.length; i++) {
      var l = this.chef.cuisines[i];
      if (l._id === _t252._id) {
        this.chef.cuisines.splice(i, 1);
      }
    }
  }

  removeSlot(_t249: Slot) {
    for (var i = 0; i < this.chef.slots.length; i++) {
      var l = this.chef.slots[i];
      if (l._id === _t249._id) {
        this.chef.slots.splice(i, 1);
        this.cancelEdit();
        this.updateChef();
      }
    }
  }
  
  onSelectSlot(_t240: Slot) {
    let found = false;
    for (var i = 0; i < this.chef.slots.length; i++) {
      var c = this.chef.slots[i];
      if (c._id === _t240._id) {
        found = true;
      }
    }
    if (!found) {
      this.chef.slots.push(_t240);
      this.updateChef();
    }
  }




  onSelectServiceLocation(_t170: ServiceArea) {
    let found = false;
    for (var i = 0; i < this.chef.serviceAreas.length; i++) {
      var l = this.chef.serviceAreas[i];
      if (l._id === _t170._id) {
        found = true;
      }
    }
    if (!found) {
      this.chef.serviceAreas.push(_t170);
    }

    this.updateChef();
  }

  submitAddress() {
    if (this.utils.isEmpty(this.chef.address.addressLine1)) {
      this.errorMessage = 'Address Line1 is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.chef.address.addressLine2)) {
      this.errorMessage = 'Address Line2 is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.chef.address.city)) {
      this.errorMessage = 'City is mandatory';
      return;
    }
    if (this.utils.isEmpty(this.chef.address.postcode)) {
      this.errorMessage = 'Postcode is mandatory';
      return;
    }
    this.updateChef();
  }

  submitKitchenSettings() {
    this.updateChef();
  }

  public updateChef() {
    let observable = this.profileSvc.updateChef(this.chef);
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.chef = data;
        console.log('The updated chef: ' + JSON.stringify(data))
        this.cancelEdit();
      },
      error: (err) => {
        console.error('Erros when updating chef.' + JSON.stringify(err))
        this.errorMessage = err.error.detail;
        this.cancelEdit();
      },
    });
  }

  onChangeKitchenStatus($event) {
    this.chef.active = $event && $event.target && $event.target.checked;
  }

  onChangeDoDelivery($event) {
    this.chef.doDelivery = $event && $event.target && $event.target.checked;
  }

  onChangeDoPartyOrder($event) {
    this.chef.doPartyOrders = $event && $event.target && $event.target.checked;
  }

  submitLocations() {
    throw new Error('Method not implemented.');
  }


}

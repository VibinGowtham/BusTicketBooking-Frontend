import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';  
import { MatIconModule} from '@angular/material/icon';  
import {MatToolbarModule} from '@angular/material/toolbar';
 @NgModule({   
     imports: [MatIconModule,CommonModule,MatToolbarModule],   
     exports: [MatIconModule] 
    })  
    
 export class MaterialModule{} 
import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';  
import { MatIconModule} from '@angular/material/icon';  
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule } from "@angular/material/dialog";   
 @NgModule({   
     imports: [MatIconModule,CommonModule,MatToolbarModule,MatDialogModule],   
     exports: [MatIconModule,MatDialogModule] 
    })  
    
 export class MaterialModule{} 
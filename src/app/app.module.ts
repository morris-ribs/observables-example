import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './components/app.component';
import { StockComponent } from './stock/components/stock/stock.component';
import { RouterModule, Routes } from '@angular/router';
import {StockService} from './stock/service/stock.service';

import 'hammerjs';

import { StockDetailComponent } from './stock/components/stock-detail/stock-detail.component';
import { StockListComponent } from './stock/components/stock-list/stock-list.component';
import { UpdateStockBotComponent } from './update-stock-bot/component/update-stock-bot.component';
import { StockHistoryUpdateComponent } from './stock/components/stock-history-update/stock-history-update.component';
import { SearchStockComponent } from './stock/components/search-stock/search-stock.component';

const appRoutes: Routes = [
  { path: 'detail', component: StockDetailComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    StockDetailComponent,
    StockListComponent,
    UpdateStockBotComponent,
    StockHistoryUpdateComponent,
    SearchStockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    ChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductServiceService } from '../services/product.service';
import { EditProductComponent } from '../edit-product/edit-product.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.css']
})
export class DashboardProductComponent implements OnInit {

  displayedColumns: string[] = ['id', 'productName', 'productPrice', 'productDescription','imagePath', 'date', 'time', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductServiceService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fetchProductData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchProductData() {
    this.productService.getProductData().subscribe(
      (data: any[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
  }

  editForm(rowData: any) {
    this._dialog.open(EditProductComponent, {
      data: {
        id: rowData.id,
        ...rowData 
      }
    });
  }
  
}

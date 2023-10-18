import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products: any[] = [];
  @ViewChild('slider') sliderRef!: ElementRef<HTMLDivElement>;
  currentSlideIndex: number = 0;
  slideInterval: any; 

  constructor(private productService: ProductServiceService) {}

  ngOnInit() {
    this.fetchProductData();
  }

  ngAfterViewInit() {
    this.setAutoNavigation();
  }

  navigateToSlide(index: number) {
    this.currentSlideIndex = index;
    this.sliderRef.nativeElement.scrollTo({
      left: index * this.sliderRef.nativeElement.offsetWidth,
      behavior: 'smooth'
    });
    this.resetAutoNavigation();
  }

  setAutoNavigation() {
    this.slideInterval = setInterval(() => {
      this.currentSlideIndex =
        (this.currentSlideIndex + 1) % this.sliderRef.nativeElement.children.length;
      this.sliderRef.nativeElement.scrollTo({
        left: this.currentSlideIndex * this.sliderRef.nativeElement.offsetWidth,
        behavior: 'smooth'
      });
    }, 2500);
  }

  resetAutoNavigation() {
    clearInterval(this.slideInterval);
    this.setAutoNavigation();
  }

  
  fetchProductData() {
    this.productService.getProductData().subscribe(
      (data: any[]) => {
        console.log('Product data:', data);
        this.products = data;
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
  }

  
}

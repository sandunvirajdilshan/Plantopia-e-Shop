import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { ProductServiceService } from '../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name!: string;
  email!: string;

  private apiUrl = 'http://localhost:3000'

  constructor(
    private orderService: ProductServiceService,
    private httpClient: HttpClient
    ) {}

  ngOnInit() {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.getAdminDetails(userId);
    }
    this.loadData();
  }

  getAdminDetails(id: string) {
    this.httpClient.get<any>(`${this.apiUrl}/admin/${id}`)
      .subscribe(
        response => {
          if (response.success) {
            const admin = response.admin
            this.name = admin.Name;
            this.email = admin.email;
          } else {
            console.error('Failed to fetch user details');
          }
        },
        error => {
          console.error(error);
        }
      );
  }
  

  async loadData() {
    const orders = await this.orderService.getOrders().toPromise() as any[];
  
    if (orders) {
      const orderDates = orders.map(order => order.date);
      const orderCounts = this.countOrderDates(orderDates);
      const salesData = this.calculateSalesData(orders);
  
      this.renderBarChart(orderCounts);
      this.renderLineChart(salesData);
  
      const totalIncome = salesData.reduce((sum, item) => sum + item.sales, 0);
      const maintenanceCost = 700;
      const profit = totalIncome - maintenanceCost;
  
      this.displayTotalIncome(totalIncome);
      this.displayMaintenanceCost(maintenanceCost);
      this.displayProfit(profit);
    }
  }
  
  displayTotalIncome(totalIncome: number) {
    const totalIncomeCard = document.querySelector('.total-income-card') as HTMLElement;
    totalIncomeCard.innerText = `$${totalIncome.toFixed(2)}`;
  }
  
  displayMaintenanceCost(maintenanceCost: number) {
    const maintenanceCostCard = document.querySelector('.total-mCost-card') as HTMLElement;
    maintenanceCostCard.innerText = `$${maintenanceCost.toFixed(2)}`;
  }
  
  displayProfit(profit: number) {
    const profitCard = document.querySelector('.total-profit-card') as HTMLElement;
    profitCard.innerText = `$${profit.toFixed(2)}`;
  }

  countOrderDates(orderDates: string[]): { date: string; count: number }[] {
    const countMap: Map<string, number> = new Map();

    for (const date of orderDates) {
      if (countMap.has(date)) {
        countMap.set(date, (countMap.get(date) || 0) + 1);
      } else {
        countMap.set(date, 1);
      }
    }

    const uniqueDates = Array.from(countMap.keys());
    const orderedCounts = uniqueDates.map(date => ({
      date,
      count: countMap.get(date) || 0
    }));

    return orderedCounts;
  }

  calculateSalesData(orders: any[]): { date: string; sales: number }[] {
    const salesData: { date: string; sales: number }[] = [];
  
    const orderDatesSet = new Set(orders.map(order => order.date));
  
    for (const date of orderDatesSet) {
      const ordersOnCurrentDate = orders.filter(order => order.date === date);
      const totalAmount = ordersOnCurrentDate.reduce((sum, order) => sum + parseFloat(order.amount), 0);
      salesData.push({ date, sales: totalAmount });
    }
  
    return salesData;
  }
  
  

  renderBarChart(data: { date: string; count: number }[]) {
    const labels = data.map(item => item.date);
    const counts = data.map(item => item.count);
  
    new Chart('barchart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Orders',
            data: counts,
            borderColor: 'rgba(75, 192, 192, 1)', 
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1 
            }
          }
        }
      }
    });
  }  

  renderLineChart(data: { date: string; sales: number }[]) {
    const labels = data.map(item => item.date);
    const sales = data.map(item => item.sales);
  
    new Chart('linechart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Sales',
            data: sales,
            borderColor: 'rgba(75, 192, 192, 1)', 
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

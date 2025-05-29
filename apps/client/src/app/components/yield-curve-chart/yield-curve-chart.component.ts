import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { TreasuryData, YieldCurvePoint } from '@shared/types';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TreasuryService } from '../../services/treasury.service';

import {
  Chart,
  ChartConfiguration,
  ChartOptions,
  registerables,
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-yield-curve-chart',
  imports: [CommonModule],
  templateUrl: './yield-curve-chart.component.html',
  styleUrl: './yield-curve-chart.component.css',
})
export class YieldCurveChartComponent implements OnInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true })
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;
  private subscription: Subscription | null = null;
  lastUpdated: Date | null = null;

  constructor(private treasuryService: TreasuryService) {}

  ngOnInit(): void {
    this.loadYieldCurveData();
  }

  loadYieldCurveData(): void {
    // Clean up any existing subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.treasuryService.getYieldCurve().subscribe({
      next: (data: TreasuryData[]) => {
        if (data && data.length > 0) {
          this.createChart(data[0]); // Use the most recent data
          this.lastUpdated = new Date(data[0].date);
        }
      },
      error: (error) => {
        console.error('Error loading yield curve data:', error);
      },
    });
  }

  private createChart(treasuryData: TreasuryData): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // Convert term months to years for display
    const labels = treasuryData.yields.map((point: YieldCurvePoint) => {
      if (point.term < 12) {
        return `${point.term}M`;
      } else if (point.term === 12) {
        return '1Y';
      } else {
        return `${Math.round(point.term / 12)}Y`;
      }
    });

    const yieldValues = treasuryData.yields.map((point: YieldCurvePoint) => point.yield);

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Treasury Yield (%)',
            data: yieldValues,
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.2,
            pointBackgroundColor: '#2563eb',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (context) => {
                return `Yield: ${context.parsed.y.toFixed(2)}%`;
              },
            },
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Maturity',
            },
            grid: {
              display: true,
              color: 'rgba(0,0,0,0.1)',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Yield (%)',
            },
            grid: {
              display: true,
              color: 'rgba(0,0,0,0.1)',
            },
            beginAtZero: false,
          },
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
        },
      },
    };

    this.chart = new Chart(ctx, config);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    // Also clean up the chart instance
    if (this.chart) {
      this.chart.destroy();
    }
  }
}

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bubble-chart',
  template: '',
})

export class BubbleChartComponent implements OnInit, OnChanges {
  @Input() filmsData: any;
  @Output() showButton = new EventEmitter<boolean>();
  state: any;

  svg: any;
  bubble: any;
  format = d3.format(',d');
  color = d3.scaleOrdinal()
    .domain(['Sqoop', 'Pig', 'Apache', 'a', 'b', 'c', 'd', 'e', 'f', 'g'])
    .range(['steelblue', 'pink', 'lightgreen', 'violet', 'orangered', 'green', 'orange', 'skyblue', 'gray', 'aqua']);

  constructor(private elRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.filmsData && !this.state) {
      this.state = {...this.filmsData};
      this.initChart();
    }
    if (this.svg && this.filmsData) {
      this.changeBubble(this.filmsData);
    }
  }

  ngOnInit(): void {
  }

  initChart(): void {
    this.createSvg();
    this.createNode();
  }

  createSvg(): void {
    const diameter = 450;

    this.bubble = d3.pack()
      .size([diameter, diameter])
      .padding(10);

    this.svg = d3.select(this.elRef.nativeElement)
      .append('svg')
      .attr('viewBox', `0 0 ${diameter} ${diameter}`)
      .attr('perserveAspectRatio', 'xMinYMid')
      .attr('width', '100%')
      .attr('height', diameter)
      .attr('class', 'bubble');
  }

  createNode(): void {
    const nodes = d3.hierarchy(this.filmsData)
      .sum(d => d.size);

    const node = this.svg.selectAll('.node')
      .data(this.bubble(nodes)
        .descendants()
        .filter(d => !d.children))
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');

    node.append('title')
      .text(d => d.data.name + ': ' + this.format(d.value));

    node.append('circle')
      .attr('r', d => d.r)
      .style('fill', (d, i) => this.color(i));

    node.append('text')
      .attr('dy', '.3em')
      .style('text-anchor', 'middle')
      .text(d => d.data.name.substring(0, d.r / 6));

    this.initClickHandler();
  }

  changeBubble(root) {
    const nodes = d3.hierarchy(root)
      .sum(d => d.size);

    this.svg.selectAll('.node').remove();

    const node = this.svg.selectAll('.node')
      .data(
        this.bubble(nodes)
          .descendants()
          .filter(d => !d.children)
      );

    // capture the enter selection
    const nodeEnter = node.enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
      .attr('cursor', 'pointer');

    // re-use enter selection for circles
    nodeEnter
      .append('circle')
      .attr('r', d => d.r)
      .style('fill', (d, i) => this.color(i));

    // re-use enter selection for titles
    nodeEnter
      .append('title')
      .text(d => d.data.name + ': ' + this.format(d.value));

    nodeEnter.append('text')
      .attr('dy', '.3em')
      .style('text-anchor', 'middle')
      .text(d => d.data.name.substring(0, d.r / 6));

    node.select('circle')
      .transition().duration(1000)
      .attr('r', d => d.r)
      .style('fill', (d, i) => this.color(i));

    node.transition().attr('class', 'node')
      .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');

    node.exit().remove();

    this.initClickHandler();
  }

  private initClickHandler() {
    this.svg.selectAll('.node')
      .on('click', (event) => {
        if (!event.data.films) {
          return;
        }
        this.filmsData = event.data.films;
        this.changeBubble(this.filmsData);
        this.showButton.emit(true);
      });
  }
}

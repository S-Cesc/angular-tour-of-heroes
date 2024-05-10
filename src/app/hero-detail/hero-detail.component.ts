import {Component, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, UpperCasePipe, Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  imports: [UpperCasePipe, FormsModule, NgIf]
})
export class HeroDetailComponent {
  @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  private isInteger(value: any) {
    return typeof (+value) === 'number' ? Number.isInteger(+value)
      : !Number.isNaN(value);
  }

  private uuid_validate(value: string) {
    const e=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    return e.exec(value) != null;
  }
  

  getHero(): void {
    const idNumber = this.route.snapshot.paramMap.get('id') ?? "";
    if ((this.isInteger(idNumber) || this.uuid_validate(idNumber))) {
      this.heroService.getHero(idNumber as string)
        .subscribe(hero => this.hero = hero);
      }
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
    
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { MaterialSerice } from 'src/app/shared/classes/material.service';
import { Category } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})

export class CategoriesFormComponent implements OnInit{

  @ViewChild('input') InputRef: ElementRef
  form: FormGroup
  image: File
  isNew = true
  category: Category
  imagePreview = ''
  constructor (
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router

    ){}

  ngOnInit(): void {
    this.form = new FormGroup( {
      name: new FormControl(null, Validators.required)
    })
    this.route.params.subscribe((params: Params) => {
    })

    this.form.disable()

    this.route.params
    .pipe(
      switchMap(
        (params: Params) => {
          if (params['id']) {
            this.isNew = false
            return this.categoriesService.getById(params['id'])
          }
          return of(null)
        }
      )
    )
    .subscribe(
      category => {
        if (category) {
          this.category = category
          this.form.patchValue({
            name: category.name
          })
          this.imagePreview =  <string>category.imageSrc
          MaterialSerice.updateTextInputs()
        }
        this.form.enable()
      },
      error => MaterialSerice.toast(error.error.message)
    )
  }

  deleteCategory() {
    const decision = window.confirm(`Вы уверены, что хотите удалить категорию ${this.category.name}`)
    if (decision) {
      this.categoriesService.delete(this.category._id as string)
      .subscribe(
        response => MaterialSerice.toast(response.message),
        error => MaterialSerice.toast(error.error.message),
        () => this.router.navigate(['/categories'])
      )
    }
  }

  triggerCick() {
    this.InputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file
    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = <string>reader.result
    }
    reader.readAsDataURL(file)
  }

  onSubmit() {
    let obs$
    this.form.disable()

    if ( this.isNew ) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image)
    } else {
      obs$ = this.categoriesService.update(this.category._id!,this.form.value.name, this.image)
    }
    obs$.subscribe(
      category => {
        this.category = category
        MaterialSerice.toast('Изменения сохранены')
        this.form.enable()
      },
      error => {
        MaterialSerice.toast(error.error.message)
        this.form.enable()
      }
    )
  }
}

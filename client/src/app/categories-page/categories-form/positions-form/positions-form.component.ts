import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialInstance, MaterialSerice } from 'src/app/shared/classes/material.service';
import { Position } from 'src/app/shared/interfaces';
import { PositionsService } from 'src/app/shared/services/positions.service';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string
  @ViewChild('modal') modalRef: ElementRef
  positions: Position[] = []
  loading = false
  positionId: string = ''
  modal: MaterialInstance
  form: FormGroup
  isNewPos = true

  constructor(private positionService: PositionsService){}

  ngOnInit(): void {
  this.form = new FormGroup({
    name: new FormControl(null, Validators.required),
    cost: new FormControl(null, [Validators.required, Validators.min(1)])
  })

    this.loading = true
    this.positionService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions
      this.loading = false
    })
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }

  ngAfterViewInit(): void {
    this.modal = MaterialSerice.initModal(this.modalRef)
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id as string
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    this.modal.open()
    MaterialSerice.updateTextInputs()
  }

  onAddPosition() {
    this.positionId = ''
    this.form.reset({
      name: null,
      cost: 0
    })
    this.modal.open()
    MaterialSerice.updateTextInputs()
  }

  onCancel() {
    this.modal.close()
  }

  onDelitePosition(event: Event, position: Position) {
    event.stopPropagation()
    const decision = window.confirm(`Удалить позицию "${position.name}"?`)
    if (decision) {
      this.positionService.delete(position).subscribe(
        response => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions.splice(idx, 1)
          MaterialSerice.toast(response.message)
        },
        error => MaterialSerice.toast(error.error.message)
      )
    }
  }

  onSubmit() {

    this.form.disable()

    this.isNewPos = false

    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    const complited = () => {
          this.modal.close()
          this.form.reset({name:'', cost: 1})
          this.form.enable()
    }

    if ( this.positionId ) {
      newPosition._id = this.positionId
      this.positionService.update(newPosition).subscribe(
        position => {
          const idx =this.positions.findIndex(p => p._id === position._id)
          this.positions[idx]= position
          MaterialSerice.toast('Изминения сохранены')
        },
        error =>  MaterialSerice.toast(error.error.message),
        complited
      )
      this.isNewPos = true
    } else {
      this.isNewPos = false
      this.positionService.create(newPosition).subscribe(
        position => {
          MaterialSerice.toast('Позиция добавлена')
          this.positions.push(position)
          this.isNewPos = true
        },
        error =>  MaterialSerice.toast(error.error.message),
        complited
      )
    }
  }
}

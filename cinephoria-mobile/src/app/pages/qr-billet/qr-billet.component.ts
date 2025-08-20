import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { QRCodeComponent } from 'angularx-qrcode';


@Component({
  selector: 'app-qr-billet',
  standalone: true,
  imports: [CommonModule, IonicModule, QRCodeComponent],
  templateUrl: './qr-billet.component.html'
})
export class QrBilletComponent implements OnInit {
  seanceId!: string;
  qrData: string = 'Contenu du billet ici';
  data: string = '';
  reservation: any;



  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
  // Récupération via navigation state
  const nav = history.state;
  if (nav && nav.reservation) {
    this.reservation = nav.reservation;
    this.seanceId = this.reservation.seance._id;
    this.data = `cinephoria:seance:${this.seanceId}`;    
  } else {
    console.warn('❌ Aucune réservation reçue');
  }
}

}

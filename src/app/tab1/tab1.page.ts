import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public list: any;
  private l: any;
  private countN = 0;
  private inputValue: any;
  private isCheck: boolean;
  private listNew: any;
  private value: any;
  private boos = true;
  constructor(public http: HttpClient , public alertController: AlertController) {
    this.http.get('assets/100.json').subscribe(response =>{
      this.l = response;
      this.list = this.l.data;
    });
  }
  async createDialog(messageStr: string){
    this.boos=true;
    const alert = await this.alertController.create({
      cssClass:'my-custom-class',
      mode:'ios',
      header:'Message',
      message:messageStr,
      buttons:['ok']
    });
    await alert.present();
  }
  allQuestion(){
    this.listNew = this.list;
    this.setQuestion(true);
    const item = document.getElementById('questionText');
    item.innerHTML=this.listNew[this.countN].question;
  }
  setQuestion(boo: boolean) {
    this.boos=true;
    const chipView = document.getElementById('option');
    chipView.style.display='none';
    const answerView = document.getElementById('answerCard');
    const item = document.getElementById('questionText');
    this.inputValue='';
    answerView.style.display='none';
    if (item.innerHTML===''){
      this.createDialog('您还未选择题目');
    }else{
        if (boo===false){
          console.log('减');
          if(this.countN===0){
            this.createDialog('已经是第一题咯');
          }else{
            this.countN=this.countN-1;
            this.inputValue='';
            item.innerHTML=this.listNew[this.countN].question;
          }
        }else{
          console.log('加');
          if (this.countN===this.listNew.length-1){
            this.createDialog('已经是最后一题咯');
          }else{
            this.countN=this.countN+1;
            this.inputValue='';
            item.innerHTML=this.listNew[this.countN].question;
          }
          console.log(this.countN);
        }
    }
  }

  checkAnswer() {
    this.boos=true;
    const chipView = document.getElementById('option');
    const item = document.getElementById('questionText');
    console.log(this.countN);
    let str = this.listNew[this.countN].answer;
    str=str.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\，|\。|\；|\’|\“|\"|\、|\<|\.|\>|\/|\?]/g,'');
    // eslint-disable-next-line max-len
    console.log('str == '+str);
    if (item.innerHTML===''){
      this.createDialog('您还未选择题目');
    }else{
      this.value =
        // eslint-disable-next-line max-len
        this.inputValue.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\，|\。|\；|\’|\“|\"|\、|\<|\.|\>|\/|\?]/g,'');
      console.log('listNew = '+ this.value);
      if (this.inputValue===''){
        chipView.style.display='block';
        this.isCheck=false;
        chipView.innerHTML='您还没回答呢';
      }else{
        if (this.value===str){
          chipView.style.display='block';
          this.isCheck=true;
          chipView.innerHTML='回答正确';
        }else{
          chipView.style.display='block';
          this.isCheck=false;
          chipView.innerHTML='回答错误';
        }
      }
    }
  }

  seeAnnswer() {
    const answerView = document.getElementById('answerCard');
    const answerText = document.getElementById('answerText');
    const item = document.getElementById('questionText');
    const chipView = document.getElementById('option');
    chipView.style.display='none';
    console.log('countN2 = '+this.countN);
    if (this.boos){
      if (item.innerHTML===''){
        this.createDialog('您还未选择题目');
      }else{
        answerView.style.display='block';
        answerText.innerHTML=this.listNew[this.countN].answer;
      }
      this.boos = false;
    }else{
      answerView.style.display='none';
      this.boos = true;
    }
  }

  randomQuestion(b: boolean , num: number) {
    const chipView = document.getElementById('option');
    chipView.style.display='none';
    const answerView = document.getElementById('answerCard');
    answerView.style.display='none';
    this.boos=true;
    this.countN=0;
    this.listNew=[];
    this.inputValue='';
    for (let i = 0; i < num; i++) {
      // @ts-ignore
      this.listNew.push(this.list[Math.ceil(Math.random()*103)]);
    }
    console.log(this.listNew);
    if (b && this.countN!==0){
      const item = document.getElementById('questionText');
      item.innerHTML=this.listNew[this.countN].question;
    }else{
      const item = document.getElementById('questionText');
      item.innerHTML=this.listNew[this.countN].question;
    }
  }
}

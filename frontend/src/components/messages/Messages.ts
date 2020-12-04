
let messagesMap = new Map([
    ["signals.startFlow", "Akış Başlat"],
    ["signals.stepForward", "Devam"],
    ["signals.resolved", "Sorun Çözüldü"],
    ["signals.notResolved", "Sorun Devam Ediyor"],
    ["signals.wifiExtender", "Wifi Extender"],
    ["signals.ucretliTeknikServis", "Ücretli Teknik Servis"],
    ["signals.teklifKabulEdilmedi", "Teklif Kabul Edilmedi"],
    ["signals.taskValid", "Arıza Kaydı Geçerli"],
    ["signals.taskNotValid", "Arıza Kaydı Hatalı"],
    ["signals.stillRunFlow", "Müşteri İkna Olmadı"],
    ["signals.quitFlow", "Akışı Sonlandır"],
    ["signals.terminateFlow", "Akışı Sonlandır"],
    ["signals.submitRequest", "Kayıt Oluştur"],
    ["common.processCompleted", "Akış tamamlandı."],
    ["kablosuzAgAyarlari.modemOffline", "Müşterinin modemi kapalı veya erişilemiyor. Buradan işleminize devam edemezsiniz. Akış sonlandırılacaktır."],
    ["kablosuzAgAyarlari.radioNotSupported", "Modem üzerinden radyo sinyal durumu kontrol edilemiyor. Müşteriden kablosuz ağ ışığının yandığına dair teyit alın."],
    ["kablosuzAgAyarlari.radioDisabled", "Radyo sinyali kapalı durumda, sonraki adımda aktif hale getirilecek. İşlem sonrası müşterinin sorunu devam ediyor mu kontrol edin."],
    ["kablosuzAgAyarlari.resolved", "Müşterinin sorunu çözüldü, sonraki adımda akış sonlandırılacak."],
    ["kablosuzAgAyarlari.notResolved", "Kablosuz sorunlar sinyal kaynaklıdır. Müşteriye bu bilgiyi ilettikten sonra ücretli bir teknik servis olan modem yer değişimini veya wifi extender cihazını teklif ediniz. Müşterinin tercihi nedir ?"],
    ["kablosuzAgAyarlari.crmRequestRequired", "Bu ekranda CRM'e teşhis atılmalıdır. Geliştirme devam etmektedir."],
    ["kablosuzAgAyarlari.ssidList.info", "Bu ekrandan kablosuz ağ ayarlarını değiştirebilir, kanal iyileştirme ile müşterinin kablosuz ağında yaşadığı sorunları giderebilir veya kablosuz ağ şifresini sms olarak gönderebilirsiniz."],
    ["kablosuzAgAyarlari", "Kablosuz Ağ Ayarları"],
    ["interneteGiremiyorum", "İnternete Giremiyorum"],
    ["sayfaAcamiyorum", "Sayfa Açamıyorum"],
    ["baglantimKopuyor", "Bağlantım Kopuyor"],
    ["hizimYavas", "Hızım Yavaş"],
    ["portYonlendirme", "Port Yönlendirme"],
    ["saveRequest.requestCreateError", "CRM üzerinde teşhis kaydı oluşturulamadı."]
]); 

export const get = (message:string) => {
    let resultMessage = messagesMap.get(message);
    if(resultMessage !== null && resultMessage !== undefined){
       return resultMessage;
    }
    return message;
}
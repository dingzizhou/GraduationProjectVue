class FileTool{
  imageList = ['png','jpg','jpeg','bmp','gif'];
  txtList = ['txt'];
  excelList = ['xls','xlsx'];
  wordList = ['doc','docx'];
  pdfList = ['pdf'];
  pptList = ['ppt','pptx'];
  zipList = ['rar','zip','7z'];
  videoList = ['mp4','avi','flv','mov','mkv'];
  radioList = ['mp3','wav','wmv'];
  getFileTypeByFileName(FileName:string):string {
    let suffix = '';
    let result = '';
    if(FileName){
      const fileArrar = FileName.split('.');
      suffix = fileArrar[fileArrar.length-1]
    }
    if(!suffix) return "";
    suffix = suffix.toLocaleLowerCase();
    // 图片
    if(this.imageList.find(item=>item===suffix)) return 'img';
    // txt
    if(this.txtList.find(item=>item===suffix)) return 'txt';
    // excel
    if(this.excelList.find(item=>item===suffix)) return 'excel';
    // word
    if(this.wordList.find(item=>item===suffix)) return 'word';
    // pdf
    if(this.pdfList.find(item=>item===suffix)) return 'pdf';
    // ppt
    if(this.pptList.find(item=>item===suffix)) return 'ppt';
    // zip
    if(this.zipList.find(item=>item===suffix)) return 'zip';
    // 视频
    if(this.videoList.find(item=>item===suffix)) return 'video';
    // 音频
    if(this.radioList.find(item=>item===suffix)) return 'radio';
    return "other";
  }

}

export default FileTool;
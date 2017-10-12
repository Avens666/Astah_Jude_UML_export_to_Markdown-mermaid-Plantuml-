var TAB='\t';          //  转移字符 1 TAB
run();
function run() {  
 with(new JavaImporter(
         com.change_vision.jude.api.inf.editor,
         com.change_vision.jude.api.inf.model)) {
// Edit the astah model  ,创建Mindmap
     TransactionManager.beginTransaction();
    var editor = astah.getDiagramEditorFactory().getMindmapEditor();
    var TxtArray=exportTxtLine();
    var newDgm = editor.createMindmapDiagram(astah.getProject(),  TxtArray[0]);//newDgm为 IMindMapDiagram类的实体
    var rootTopic = newDgm.getRoot();       // rootToip的类型为 INodePresentation
        
    var OneTabCount=0;                 //用来统计只有一个TAB的行的个数；
    var regex = new RegExp(TAB, 'g'); // 使用g表示整个字符串都要匹配
    var TabCount=new Array();      // 定义数组来存放每行TAB的个数 
              TabCount[0]= 0;   //根节点的TAB为零     
    for (var k =1;TxtArray[k]!=null;k++) {         //遍历一次,主要计算各行TAB的个数              
          var result = TxtArray[k].match(regex);// 计算TAB的个数结果                
          TabCount[k]=  !result ? 0 : result.length;       
        //统计只有一个TAB的行的个数；       
          if(TabCount[k]==1) { 
             OneTabCount++;
          }        
     }
                      
     var i=1; //定义一个系数，用于后面的奇偶，左右替换     
     for( var j=1;TxtArray[j]!=null;j++) {      // 遍历TXT文件里面的每行         
      switch( TabCount[j] )  {
         case 1: {
             if(OneTabCount<=5)  {            
                 var Node1 =editor.createTopic(rootTopic, TxtArray[j]);  //执行代码块 1 只有1个TAB 
             }  
             else{
                 if((i%2)==1){                  
                 var Node1 =editor.createTopic(rootTopic, TxtArray[j],"left");               
                 }
                 if((i%2)==0){
                     Node1 =editor.createTopic(rootTopic, TxtArray[j],"right");                 
                 }
                    ++i;
             }
         }          
                break;
         case 2:
                var Node2 =editor.createTopic(Node1, TxtArray[j]);
                break;
         case 3:
                var Node3 =editor.createTopic(Node2, TxtArray[j]);
                break;
         case 4:
                var Node4 =editor.createTopic(Node3, TxtArray[j]);
                break;  
         case 5:
                var Node5 =editor.createTopic(Node4, TxtArray[j]);
                break;     
         default:                  
         } 
     }          
      TransactionManager.endTransaction();
      print('New Mindmap was created!');    
  }
}


function exportTxtLine() { 
    var txtFile = selectTxtFile();
    if (txtFile == null) {
     return;
    }
    with(new JavaImporter(
            java.io)) {               //头文件声明
        var fRead = new BufferedReader(new FileReader(txtFile));       
        var  line = fRead.readLine();  
        var  arr=new Array;
        var  i=0;
         while (line!=null ) {     //遍历TXT文件里面的每一行                             
       //    print("文件内容: " + line+"\n");
           arr[i]=line;
           line = fRead.readLine(); //  读取下一行
           i++;
         }  
    }  
    return arr;
}

function selectTxtFile() {
    with(new JavaImporter(
            java.io,
            javax.swing)) {          //头文件声明
        var chooser = new JFileChooser();
        
        var selected=chooser.showOpenDialog(null);      
        if (selected == JFileChooser.APPROVE_OPTION) {     //获得选中的文件
            var file = chooser.getSelectedFile();
            if (file.getName().toLowerCase().endsWith('.txt')) {
                return file;
            } 
            else {
                JOptionPane.showMessageDialog(null, "Please open .txt file!");
                return null;
            }
        }
    }
}


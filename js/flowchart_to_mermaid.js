//  This script convert Astah flowchart to mermaid fomat text 
//  Author:      Chen Zhi
//  E-mail:      cz_666@qq.com
//  License: APACHE V2.0 (see license file) 
var depth = 0;
var INDENT_STR = 'A'; //2 spaces
var ITEM_MARKER_STR = '* ';

run();

function run() {
    with(new JavaImporter(
            com.change_vision.jude.api.inf.model)) {
        var diagramViewManager = astah.getViewManager().getDiagramViewManager();
        var diagram = diagramViewManager.getCurrentDiagram();


       if (!(diagram instanceof IActivityDiagram)) 
       {
           print('Open a flowchart and run again.');
           return;
       }

        if (!(diagram.isFlowChart() )) 
       {
           print('Open a flowchart and run again.');
           return;
       }

         print(diagram + ' Flowchart\n');
         print('```mermaid\ngraph TB\n');
       // print(diagram.isFlowChart() )
        var flow = diagram.getActivity().getFlows();

        
        var flow_names = new Array();
        var flow_obj = new Array();
        var m = 0;
        for (var i in flow) {
            var n = flow_obj.indexOf(flow[i].getSource() );
            //print(n + ",");
            if(n < 0)
            {//
           //     print(INDENT_STR+m+"[" +flow[i].getSource()+"];\n"  );
                flow_names[m] = INDENT_STR+m;
                flow_obj[m] = flow[i].getSource();
                m++;
            }            
        }

       
        for (var i in flow) {
            var n = flow_obj.indexOf(flow[i].getTarget() );
            //print(n + ",");
            if(n < 0)
            {//
            //    print(INDENT_STR+m+"[" +flow[i].getTarget()+"];\n"  );
                flow_names[m] = INDENT_STR+m;
                flow_obj[m] = flow[i].getTarget();
                m++;
            }            
        }

        //print object define
         for (var i in flow_names) 
         {
             print(INDENT_STR+i+"[" +flow_obj[i] + "];\n"  );
         }

        //print flowchart logic
        for (var i in flow) {
            var m = flow_obj.indexOf(flow[i].getSource() );
            var n = flow_obj.indexOf(flow[i].getTarget() );
            if(n >= 0)
            {
            print(flow_names[m] +"-->"  );
                if(flow[i].getGuard() == "Y")
                {
                    print("|Y| " );
                }
                else  if(flow[i].getGuard() == "N")
                {
                     print("|N| " );
                }
                
            print( flow_names[n] +";\n"   );            
            }

        }

         print('```');
    }
}

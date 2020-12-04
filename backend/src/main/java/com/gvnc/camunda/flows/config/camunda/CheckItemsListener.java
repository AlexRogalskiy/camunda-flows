package com.gvnc.camunda.flows.config.camunda;

import com.gvnc.camunda.flows.model.ui.CheckItem;
import lombok.Getter;
import lombok.Setter;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.ExecutionListener;
import org.camunda.bpm.engine.delegate.Expression;

import java.util.HashSet;
import java.util.Set;

public class CheckItemsListener implements ExecutionListener {

    @Getter @Setter
    private Expression label;

    @Getter @Setter
    private Expression decoration;

    @Override
    public void notify(DelegateExecution delegateExecution) throws Exception {
        try {
            if (label != null && decoration != null) {
                Set<CheckItem> itemList = (Set<CheckItem>) delegateExecution.getVariable("checkItemList");

                if (itemList == null)
                    itemList = new HashSet<>();

                CheckItem checkItem = new CheckItem();
                checkItem.setLabel(label.getExpressionText());
                checkItem.setDecoration(decoration.getExpressionText());

                itemList.add(checkItem);
                delegateExecution.setVariable("checkItemList", itemList);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}

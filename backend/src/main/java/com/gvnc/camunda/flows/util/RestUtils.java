package com.gvnc.camunda.flows.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.BooleanNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.TextNode;

public class RestUtils {

    public static Boolean getBooleanValue(ObjectNode object, String key){
        JsonNode valueNode = object.get(key);
        if(valueNode != null && valueNode instanceof BooleanNode)
            return valueNode.booleanValue();
        return null;
    }

    public static String getStringValue(ObjectNode object, String key){
        JsonNode valueNode = object.get(key);
        if(valueNode != null && valueNode instanceof TextNode)
            return valueNode.textValue();
        return null;
    }

    public static Integer getIntegerValue(ObjectNode object, String key){
        JsonNode valueNode = object.get(key);
        if(valueNode != null && valueNode instanceof com.fasterxml.jackson.databind.node.IntNode)
            return valueNode.intValue();
        return null;
    }
}

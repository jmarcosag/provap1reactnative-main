import React, { useState } from "react";
import {Picker} from '@react-native-picker/picker';
import { Button, StyleSheet,TextInput, View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import TakePicture from '../camera';



export default function Form() {

  const [bairro, setBairro] = useState(null);
  const [rua, setRua] = useState(null);
  const [numero, setNumero] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cidade, setCidade] = useState("selecione uma cidade");
  const [selectedValue, setSelectedValue] = useState("default");

  function validar() {
    if(bairro != null && selectedValue != "default" && rua != null) {
        setIsOpen(true)
    } else {
        Alert.alert('Todos os campos devem ser preenchidos!')
    }
  }

    function confirmarEnvio() {
      setIsOpen(false)
      setBairro(null)
      setRua(null)
      setNumero(null)
      setDescricao(null)
      setSelectedValue("default")
  }

  return (
    
    <View>
      <View>
          <Text>Informe a Cidade:</Text>          
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, indexItem)=>setSelectedValue(itemValue)}
          >
                <Picker.item key={0} label="Vassouras" value="Vassouras"/>
                <Picker.item key={1} label="Barra do Piraí" value="Barra do Piraí"/>
                <Picker.item key={2} label="Mendes" value="Mendes"/>
                <Picker.item key={3} label="Três Rios" value="Três Rios"/>
                <Picker.item key={4} label="Paraíba do Sul" value="Paraíba do Sul"/>
                <Picker.item key={5} label="Miguel Pereira" value="Miguel Pereira"/>
                <Picker.item key={6} label="Valença" value="Valença"/>                                
                <Picker.item key={7} label="Rio das Flores" value="Rio das Flores"/>                
          </Picker> 
          <Text>Informe o Bairro:</Text>
          <TextInput
            value={bairro}
            onChangeText={setBairro}
          ></TextInput>
          <Text>Informe a Rua:</Text>
          <TextInput
            value={rua}
            onChangeText={setRua}
          ></TextInput>  
          <Text>Informe o Número:</Text>
          <TextInput
            value={numero}
            onChangeText={setNumero}
            keyboardType="numeric"
          ></TextInput>
          <Text>Descrição:</Text>
          <TextInput
            value={descricao}
            onChangeText={setDescricao}
          ></TextInput>                          
          <TouchableOpacity onPress={ () => validar()}>
            <Text>Notificar</Text>
          </TouchableOpacity>
          <Modal transparent={true} visible={isOpen}>
                <TakePicture 
                    bairro={bairro}
                    rua={rua}
                    numero={numero}
                    descricao={descricao}
                    cidade={selectedValue}
                    confirmarEnvio={confirmarEnvio}
                />
            </Modal>
      </View>
    </View>
  );
}

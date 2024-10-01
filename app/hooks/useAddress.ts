import { useState, ChangeEvent } from "react";
import { fetchAddressByZip } from "../services/viaCepApi";

const useAddress = () => {
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState({
    endereco: "",
    numero: "",
    complemento: "",
    estado: "",
    cidade: "",
  });

  const buscarCep = async (e: ChangeEvent<HTMLInputElement>) => {
    const zip = e.target.value;
    setZipCode(zip);

    if (zip.length === 8) {
      try {
        const data = await fetchAddressByZip(zip);
        setAddress({
          endereco: data.logradouro,
          numero: data.logradouro,
          complemento: data.logradouro,
          estado: data.uf,
          cidade: data.localidade,
        });
      } catch (error) {
        console.error("Falha ao buscar endereço", error);
      }
    }
  };

  return { zipCode, setZipCode, address, buscarCep };
};

export default useAddress;

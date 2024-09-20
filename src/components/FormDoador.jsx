import React, { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';

import {
    Container,
    Segment,
    Grid,
    BreadcrumbSection,
    BreadcrumbDivider,
    Breadcrumb,
    Label,
    Divider,
    Header,
    FormField,
    Button,
    Checkbox,
    Form,
    FormInput,
    FormGroup,
    FormTextArea,
    Icon,
    TextArea,

} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import "./FormDoador.css"



function FormDoador() {


    const [stepFormContact, setStepFormContact] = useState(true);
    const [stepFormAndress, setStepFormAndress] = useState(false);
    const [stepVerification, setStepVerification] = useState(false);

    const [erros, setErros] = useState({});

    // Estado para armazenar os valores dos inputs
    const [formValues, setFormValues] = useState({
        name: '',
        last_name: '',
        email: '',
        phone:'',
        motivation:'',
        address: {
            cep: '',
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
            numero: ''
          },

    });

    const [todosDados, setTodosDados] = useState([])

    useEffect(() => {
        console.log("Aqui são os dados atualizados", todosDados);
    }, [todosDados]); // Este useEffect é chamado sempre que todosDados muda


    // Função para atualizar os valores conforme o usuário digita
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name.startsWith('address.')) {
            const field = name.split('.')[1];
            setFormValues((prevState) => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [field]: value
                }
            }));
        } else {
            setFormValues({
                ...formValues,
                [name]: value
            });
        }
    };
    



    function voltarParaContato() {
        setStepFormContact(true);
        setStepFormAndress(false);
    }

    function irParaEndereco() {
        setStepFormContact(false);
        setStepFormAndress(true);
    }

    function voltarParaEndereco() {
        setStepVerification(false);
        setStepFormAndress(true);
    }

    function irParaVerificacao() {
        setStepFormAndress(false);
        setStepVerification(true);
    }

    async function enviarFormulario() {
        console.log("Dados do formulário:", formValues);

        setTodosDados(prevTodosDados => [...prevTodosDados, formValues]);

        try {
            // Envia os dados para o backend via POST
            const response = await fetch('http://localhost:5000/person/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues), // Converte o objeto formValues para JSON
                
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar dados para o servidor');
            }

            const data = await response.json();
            console.log('Resposta do servidor:', data);

            // Caso você queira limpar o formulário após o envio
            setFormValues({
                name: '',
                last_name: '',
                email: '',
                phone: '',
                motivation: '',
                address: {
                    cep: '',
                    estado: '',
                    cidade: '',
                    bairro: '',
                    rua: '',
                    numero: ''
                }
            });
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    }
    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <>
            <div className="container-formulario">


                {/* Step formulario Contato*/}


                {stepFormContact ?
                    <div className="wizard-form">
                        <header className="wizard-header">
                            {isMobile ?
                                /*Modo mobile para Step Contato */
                                <div>
                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Label circular className="color-label-circle-active">1</Label>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">2</Label>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">3</Label>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider horizontal>
                                        <Header as='h4' className="header-form">
                                            Contato
                                        </Header>
                                    </Divider>
                                </div>

                                /*Modo computador para Step Contato */

                                : <div>

                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Label circular className="color-label-circle-active">1</Label>
                                            <BreadcrumbSection>Contato</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">2</Label>
                                            <BreadcrumbSection >Endereço</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">3</Label>
                                            <BreadcrumbSection >Verificação</BreadcrumbSection>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider inverted />
                                </div>
                            }
                        </header>

                        <main className="wizard-main">
                            <Form>
                                <div className="form-inputs">
                                    {/* Inputs dinâmicos de cada etapa */}
                                    <FormInput
                                        fluid
                                        error={!!erros.name && { content: erros.name }}
                                        label={<label className="blue-label">Nome</label>}
                                        placeholder="Digite seu nome"
                                        name="name"
                                        type="text"
                                        maxLength={61}
                                        value={formValues.name}
                                        onChange={handleChange}
                                    />
                                    <FormInput
                                        fluid
                                        error={!!erros.nome && { content: erros.nome }}
                                        label={<label className="blue-label">Sobrenome</label>}
                                        placeholder="Digite seu sobrenome"
                                        name="last_name"
                                        type="text"
                                        maxLength={61}
                                        value={formValues.last_name}
                                        onChange={handleChange}
                                    />
                                    <FormInput
                                        icon='phone'
                                        iconPosition='left'
                                        fluid
                                        error={!!erros.telefone && { content: erros.telefone }}
                                        label={<label className="blue-label">Telefone</label>}
                                        placeholder="Digite seu telefone"
                                        name="phone"
                                        maxLength={16}
                                        value={formValues.phone}
                                        onChange={handleChange}
                                    />
                                    <FormInput
                                        icon='mail'
                                        iconPosition='left'
                                        fluid
                                        error={!!erros.email && { content: erros.email }}
                                        label={<label className="blue-label">E-mail</label>}
                                        placeholder="Digite seu e-mail"
                                        name="email"
                                        maxLength={30}
                                        value={formValues.email}
                                        onChange={handleChange}
                                    />
                                    <FormInput
                                        icon='mail'
                                        iconPosition='left'
                                        fluid
                                        error={!!erros.email && { content: erros.email }}
                                        label={<label className="blue-label">Motivação</label>}
                                        placeholder="Digite seu e-mail"
                                        name="motivation"
                                        maxLength={30}
                                        value={formValues.motivation}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Form>
                        </main>

                        <footer className="wizard-footer">
                            <Button type='submit' className="btn-internal-forms-back">nao faz nada</Button>
                            <Button type='submit' className="btn-internal-forms-continous" onClick={irParaEndereco}>Continuar</Button>
                        </footer>
                    </div>

                    : null
                }


                {/* Step formulario endereço*/}


                {stepFormAndress ?
                    <div className="wizard-form">
                        <header className="wizard-header">
                            {isMobile ?
                                /*Modo mobile para Step Endereço */
                                <div>
                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle-active">2</Label>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">3</Label>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider horizontal>
                                        <Header as='h4' className="header-form">
                                            Endereço
                                        </Header>
                                    </Divider>
                                </div>

                                /*Modo computador para Step Endereço */

                                : <div>

                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbSection>Contato</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle-active">2</Label>
                                            <BreadcrumbSection >Endereço</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle">3</Label>
                                            <BreadcrumbSection >Verificação</BreadcrumbSection>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider inverted />
                                </div>
                            }
                        </header>

                        <main className="wizard-main">
                            <Form>
                                <div className="form-inputs">
                                    {/* Inputs dinâmicos de cada etapa */}
                                    <FormInput
                fluid
                error={!!erros.cep && { content: erros.cep }}
                label={<label className="blue-label">CEP</label>}
                placeholder="Digite seu CEP"
                name="address.cep"
                type="text"
                maxLength={20}
                value={formValues.address.cep}
                onChange={handleChange}
            />
            <FormGroup widths='equal'>
                <FormInput
                    fluid
                    error={!!erros.estado && { content: erros.estado }}
                    label={<label className="blue-label">Estado</label>}
                    placeholder="Digite seu estado"
                    name="address.estado"
                    type="text"
                    maxLength={20}
                    value={formValues.address.estado}
                    onChange={handleChange}
                />
                <FormInput
                    fluid
                    error={!!erros.cidade && { content: erros.cidade }}
                    label={<label className="blue-label">Cidade</label>}
                    placeholder="Digite sua cidade"
                    name="address.cidade"
                    type="text"
                    maxLength={20}
                    value={formValues.address.cidade}
                    onChange={handleChange}
                />
                <FormInput
                    fluid
                    error={!!erros.bairro && { content: erros.bairro }}
                    label={<label className="blue-label">Bairro</label>}
                    placeholder="Digite seu bairro"
                    name="address.bairro"
                    type="text"
                    maxLength={20}
                    value={formValues.address.bairro}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup widths='equal'>
                <FormInput
                    fluid
                    error={!!erros.rua && { content: erros.rua }}
                    label={<label className="blue-label">Rua</label>}
                    placeholder="Digite sua rua"
                    name="address.rua"
                    type="text"
                    maxLength={20}
                    value={formValues.address.rua}
                    onChange={handleChange}
                />
                <FormInput
                    fluid
                    error={!!erros.numero && { content: erros.numero }}
                    label={<label className="blue-label">Número</label>}
                    placeholder="Digite o número"
                    name="address.numero"
                    type="text"
                    maxLength={20}
                    value={formValues.address.numero}
                    onChange={handleChange}
                />

                                    </FormGroup>
                                </div>
                            </Form>
                        </main>

                        <footer className="wizard-footer">
                            <Button type='submit' className="btn-internal-forms-back" onClick={voltarParaContato}>Voltar</Button>
                            <Button type='submit' className="btn-internal-forms-continous" onClick={irParaVerificacao}>Continuar</Button>
                        </footer>
                    </div>

                    : null
                }


                {/* Step formulario Verificação*/}

                {stepVerification ?
                    <div className="wizard-form">
                        <header className="wizard-header">
                            {isMobile ?
                                /*Modo mobile para Step Verificação */
                                <div>
                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle-active">3</Label>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider horizontal>
                                        <Header as='h4' className="header-form">
                                            Verificação
                                        </Header>
                                    </Divider>
                                </div>

                                /*Modo computador para Step Verificação */

                                : <div>

                                    <Container textAlign="center">
                                        <Breadcrumb>
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbSection>Contato</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Icon name="check circle" size="large" className="color-label-circle-sucess" />
                                            <BreadcrumbSection >Endereço</BreadcrumbSection>
                                            <BreadcrumbDivider icon='right chevron' />
                                            <Label circular className="color-label-circle-active">3</Label>
                                            <BreadcrumbSection >Verificação</BreadcrumbSection>
                                        </Breadcrumb>
                                    </Container>
                                    <Divider inverted />
                                </div>
                            }
                        </header>

                        <main className="wizard-main">
                            <Form>
                                <div className="form-inputs">
                                    {/* Inputs dinâmicos de cada etapa */}
                                    <FormInput
                                        fluid
                                        error={!!erros.codigoVerificacao && { content: erros.codigoVerificacao }}
                                        label={<label className="blue-label">Código de verificação</label>}
                                        placeholder="Digite o código de verificação"
                                        name="codigoVerificacao"
                                        type="text"
                                        maxLength={20}
                                        value={formValues.codigoVerificacao}
                                        onChange={handleChange}
                                    />
                                    <button type="submit" onClick={enviarFormulario} >Enviar codigo</button>
                                </div>
                            </Form>
                        </main>

                        <footer className="wizard-footer">
                            <Button type='submit' className="btn-internal-forms-back" onClick={voltarParaEndereco}>Voltar</Button>
                            <Button type='submit' className="btn-internal-forms-continous" onClick={enviarFormulario}>Enviar</Button>
                        </footer>
                    </div>

                    : null
                }


            </div>

        </>
    )
}

export default FormDoador;
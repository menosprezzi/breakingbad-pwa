# BreakingBad PWA
![Unit Tests](https://github.com/menosprezzi/dragons/workflows/Unit%20Tests/badge.svg?branch=master)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.2.

## Resumo
Esta é uma PWA desenvolvida em Angular.
Preferi a utilização do Angular pois como tecnologia ele oferece
um maior tooling na caixa para o desenvolvimento de um Web App, embora adicione
maior complexidade estrutural em um primeiro momento. Seus conceitos servem de base para
o desenvolvimento de grandes aplicações, possuindo uma vasta documentação própria, o que facilita
integração de novos desenvolvedores em um time com o entendimento da abordagem Angular e favorece a escalabilidade do projeto.

> Frameworks are not tools for organizing your code. They are tools for organizing your mind. [Rich Harris]

## Arquitetura

Foi escolhido a abordagem [CBA](https://medium.com/omarelgabrys-blog/component-based-architecture-3c3c23c7e348),
agrupando os objetos conforme seu contexto, minimizando o acoplamento do código.

Resolvi utilizar de algumas práticas e estruturas visando o desenvolvimento de uma aplicação de mundo-real, mesmo se tratando de um app simples,
para demonstrar como podemos organizar o nosso código de maneira mais desacoplada.
Um exemplo, foi o uso de [Injection Tokens](https://angular.io/api/core/InjectionToken) para cuidar de variáveis de ambiente da aplicação.
* Ex: `app.module.ts`
Foi utilizado de _Path Aliases_ para isolar os _imports_ entre os módulos. Além de deixar mais claro as interações entre módulos, 
quando esta prática está alinhada ao uso de Lints, tem como benefício restringir a utilização das interfaces públicas dos módulos, reduzindo assim um possível acoplamento.

Comumente questiona-se como controlar mudanças repentinas na Modelo da API, como por exemplo a exclusão de um campo. O fato de utilizarmos de TypeScript favorece a rastreabilidade dos campos de um contrato,
mas mesmo assim, podemos ter outros problemas. Uma das abordagens propostas aqui é o uso de `DTOs` e `Models` (`characters.types.ts` e `characters.model.ts`),
onde `DTO` (Data Transfer Object) representa o contrato com a API e o `Model` representa o objeto desserializado para manipulação dentro da aplicação.

Visando uma maior acessibilidade, este app mantém o uso de HTML semântico e de propriedades ARIA.

Utilizando de SCSS, foi levado em consideração as boas práticas de [BEM](http://getbem.com/naming/) para a nomenclatura de classes.
* Ex: `character-card.component.scss`

### Ferramentas
#### Layout
Como base, resolvi utilizar da Grid e de utilitários SCSS do Bootstrap 4 pois é uma ferramenta simples e leve para compor layouts em Flexbox, sem reinventar a roda.
O FontAwesome foi utilizado para os ícones. Existe um binding Angular oficial do FontAwesome que favorece o Treeshake do uso dos ícones, mas preferi uma abordagem mais simples, utilizando apenas do CSS via CDN.

#### Versionamento e CI/CD
Foi realizado o setup de CI utilizando os workflows do Github Actions. O Build e os Testes Unitários são executados mediante a ações de Merge e PR para a branch master. Aliás, sugiro este workflow de branches para estes projetos:
![Versionamento](https://github.com/menosprezzi/dragons/blob/master/.github/wiki/res/images/git-flow-chart.png)

### Considerações
#### Arquitetura
Desenvolvendo com CBA em Angular podemos aprimorar o Tree-shake e LazyLoad das páginas, porém ([enquanto aguardamos o lançamento desta funcionalidade do Ivy](https://blog.angularindepth.com/angular-revisited-tree-shakable-components-and-optional-ngmodules-329a4629276d))
adicionar um módulo para cada Component muitas vezes pode ser chateante, ainda mais em grandes aplicações. Utilizar de [SCAM](https://medium.com/wishtack/your-angular-module-is-a-scam-b4136ca3917b) seria uma alternativa viável para reduzir arquivos repetitivos.

#### State Management
Muitas vezes não se faz necessário a utilização de libs para gerência de estado, como NgRx ou Mobx, por também adicionar novos conceitos e complexidade ao projeto.
O simples fato de utilizar [Observables para armazenar estado em Services](https://coryrylan.com/blog/angular-observable-data-services) já pode dar ganhos na reatividade da aplicação (quando bem estruturado).
Porém, poderia ser implementado utilizando de [um Schematics](https://github.com/angular-extensions/model), automatizando esse processo.

#### Testes
Manter os testes unitários é de grande importância, sempre realizando o Mock de dependências externas.
* Ex: `characters.service.spec.ts`
Além disso, seria ótimo integrar ferramentas como o [pixelmatch](https://github.com/mapbox/pixelmatch) para realizar testes visuais em alguns componentes como o `CharacterCard`.

#### Usabilidade
Visando melhora da experiência do usuário, a tela de listagem (characters-list) poderia carregar a paginação a partir do Scroll do usuário. Isso poderia ser implementado utilizando do módulo [Scrolling do @angular/cdk](https://material.angular.io/cdk/scrolling/overview).

#### API
Em aplicações reais, é uma boa prática centralizar o acesso à API em um Service, controlando token de acesso e outras heurísticas, sendo ele utilizado nos demais Services.
Esse service poderia ser chamado de `ApiService` declarado no módulo `core`, sendo ele utilizado no service `CharactersService` para realizar requisições, ao invés do uso direto do `HttpService`.

#### Design System
Para produtos no modelo Saas ou Paas, sugiro centralizar os Componentes de UI dos projetos em uma biblioteca única, visando o reuso. Uma técnica que tem isso como foco, além de estruturar um processo de UI/UX, é o DesignSystem.
Um exemplo é um pacote que tomei a iniciativa de desenvolver em outra oportunidade, o [Solar Components](https://github.com/accera-tech/solar-components). Implementamos um Design System utilizando o [Stencil](https://stenciljs.com/), a tecnologia desenvolvida pelo time do [Ionic](https://ionicframework.com/) como uma solução para o desenvolvimento de WebComponents.
O Stencil é um compiler de WebComponents, e leva em consideração diversos fatores de usabilidade no seu desenvolvimento, como o LazyLoad de components, carregando os componentes utilizados em uma tela por demanda.
Por ser menos verboso que o Angular (@angular/elements) na criação de componentes mas ainda sim por utilizar de TypeScript, seu desenvolvimento se dá de forma rápida e consistente.
Estruturalmente, esse projeto foi criado com o conceito de [Atomic Design](http://atomicdesign.bradfrost.com/) em mente. Tudo isso facilita o desenvolvimento de uma biblioteca agnóstica a frameworks e reutilizável.
Porém, WebComponents não é uma bala de prata, mas está sendo um caso de sucesso onde se possui diversos produtos desenvolvidos com tecnologias e times diferentes, e em até produtos legados que utilizem de SSR em .NET MVC ou semelhantes.

import React from "react";
import {FAQQuestion} from "./FAQItem";
import YoTeCocinoLogo from "../ui/YoTeCocinoLogo";


const questions: FAQQuestion[] = [
  {
    question: "Pero, ¿esto no va en contra de la obligación de quedarnos en casa?",
    answer: <p><b>#yotecocino</b> está pensado única y exclusivamente para faciliar el contacto entre personas, que por
      su situación, debe salir de casa. Por ejemplo personal sanitario, cuerpos de seguridad del estado o personal de
      tiendas de alimentación. Para evitar desplazamientos innecesarios, hemos limitado el radio de búsqueda a las
      cercanías del lugar del trabajo de nuestros #héroes y #heroinas. De este modo, la entrega debe realizarse en el
      lugar donde nuestros #cocinillas esté pasando el confinamiento.</p>
  },
  {
    question: "Me he ofrecido como #cocinillas y me habéis dado un código, ¿qué tengo que hacer con él?",
    answer: <>
      <p>
        Este código sirve única y exclusivamente para poder dar de baja una comida. Si llegado el momento no pudieras
        cocinar más o quisieras modificar los "tuppers" que has publicado, tendrás que dar de baja la comida. Para ello
        simplemente tendrías que ir a <a href="/#myFood">tus tuppers registrados</a> y añadir el código en el campo de
        texto habilitado para tal fin.
      </p>
      <p>
        En esta misma pantalla, si registraste la comida con el mismo dispositivo (ordenador, movil o tablet) con el que
        quieres dar de baja, te aparecerá esa misma comida para seleccionarla, por lo que no necesitarías utilizar el
        identificador en ningún momento. Sin embargo, si trataras de hacerlo desde un dispositivo diferente,
        necesitarías introducir el código de manera manual.
      </p>
    </>

  },
  {
    question: "Me he ofrecido como #cocinillas, ¿cómo contactarán conmigo?",
    answer:
      <p>Al registrate como #cocinillas se te pedirá una forma de contacto. <b>Esta información es pública por lo que no
        pongas información sensible aquí.</b> Nuestra preferencia es usar nuestro usuario de twitter, aunque algunas
        personas están usando su número de teléfono o email. Esto no debería ser problemático ya que no hay ninguna otra
        información personal asociada.</p>,
  },
  {
    question: "Estoy buscando comida, ¿cómo puedo contactar con mi #cocinillas preferido?",
    answer:
      <p>Nuestros héroes y heroínas, que buscan comida, realizarán una búsqueda cercana lugar de trabajo y verán las
        ofertas poblicadas. En cada oferta se mostrará la descripción y la forma de contacto. <b>A partir de este
          momento toda la comunicación que se realize se llevará a cabo fuera de <YoTeCocinoLogo/></b>.</p>
  },
  {
    question: "Me he ofrecido como #cocinillas, ¿cómo sé a que hora tengo que dejar el tupper?",
    answer: <p>Una vez la persona que solicita tu comida haya contactado contigo, podréis concretar el momento de la
      entrega.</p>
  },
  {
    question: "Me he ofrecido como #cocinillas, ¿cómo tengo entrego el tupper?",
    answer: <>
      <p><b>En ningún caso debería establecerse un contacto directo entre #cocinillas y #héroes</b></p>
      <p>Un una vez acordada la entrega, prepara el tupper y déjalo en una bolsa en el portal para ser recogida.</p>
      <p><b>Recuerda que no debes desplazarte</b> debido al estado de alarma. Será el profesional quién se acerque a
        recogerla.</p>
    </>
  },
];

export default questions;
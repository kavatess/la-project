import * as ejs from 'ejs';
import { OrderProperties } from '../../libs/models/src';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const data = {
  name: 'order',
  className: 'Order',
  props: Object.keys(OrderProperties).map((key) => key),
};

const renderTemplate = (fileName: string) =>{
  const templateStr= readFileSync('./template/' + fileName,'utf-8');
  return ejs.render(templateStr, data); 
}

const templateTree: any = {
  root:{
    html: renderTemplate('root.component.html'),
    css: renderTemplate('root.component.scss'),
    ts: renderTemplate('root.component.ts'),
    module: renderTemplate('root.module.ts'),
    service: renderTemplate('root.service.ts'),
    routes: renderTemplate('root.routes.ts'),
  },
  createComp: {
    html: renderTemplate('create/create.component.html'),
    css: renderTemplate('create/create.component.scss'),
    ts: renderTemplate('create/create.component.ts'),
    module: renderTemplate('create/create.module.ts'),
  },
  updateComp: {
    html: renderTemplate('update/update.component.html'),
    css: renderTemplate('update/update.component.scss'),
    ts: renderTemplate('update/update.component.ts'),
    module: renderTemplate('update/update.module.ts'),
  },
  formComp: {
    html: renderTemplate('form/form.component.html'),
    css: renderTemplate('form/form.component.scss'),
    ts: renderTemplate('form/form.component.ts'),
    module: renderTemplate('form/form.module.ts'),
  },
};

const writePath= `../../apps/admin-app/src/app/modules/${data.name}s`;

mkdirSync(writePath);
mkdirSync(`${writePath}/create-${data.name}`);
mkdirSync(`${writePath}/update-${data.name}`);
mkdirSync(`${writePath}/${data.name}-form`);
for (const key in templateTree) {
    if(key === 'createComp') {
        writeFileSync(`${writePath}/create-${data.name}/create-${data.name}.component.html`, templateTree[key].html);
        writeFileSync(`${writePath}/create-${data.name}/create-${data.name}.component.scss`, templateTree[key].css);
        writeFileSync(`${writePath}/create-${data.name}/create-${data.name}.component.ts`, templateTree[key].ts);
        writeFileSync(`${writePath}/create-${data.name}/create-${data.name}.module.ts`, templateTree[key].module);
    }
    else if(key === 'updateComp') {
        writeFileSync(`${writePath}/update-${data.name}/update-${data.name}.component.html`, templateTree[key].html);
        writeFileSync(`${writePath}/update-${data.name}/update-${data.name}.component.scss`, templateTree[key].css);
        writeFileSync(`${writePath}/update-${data.name}/update-${data.name}.component.ts`, templateTree[key].ts);
        writeFileSync(`${writePath}/update-${data.name}/update-${data.name}.module.ts`, templateTree[key].module);
    }
    else if(key === 'formComp') {
        writeFileSync(`${writePath}/${data.name}-form/${data.name}-form.component.html`, templateTree[key].html);
        writeFileSync(`${writePath}/${data.name}-form/${data.name}-form.component.scss`, templateTree[key].css);
        writeFileSync(`${writePath}/${data.name}-form/${data.name}-form.component.ts`, templateTree[key].ts);
        writeFileSync(`${writePath}/${data.name}-form/${data.name}-form.module.ts`, templateTree[key].module);
    }
    else if(key === 'root') {
        writeFileSync(`${writePath}/${data.name}s.component.html`, templateTree[key].html);
        writeFileSync(`${writePath}/${data.name}s.component.scss`, templateTree[key].css);
        writeFileSync(`${writePath}/${data.name}s.component.ts`, templateTree[key].ts);
        writeFileSync(`${writePath}/${data.name}s.module.ts`, templateTree[key].module);
        writeFileSync(`${writePath}/${data.name}s.service.ts`, templateTree[key].service);
        writeFileSync(`${writePath}/${data.name}s.routes.ts`, templateTree[key].routes);
    }
}

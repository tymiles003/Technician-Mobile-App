# JSTemplateApp Prerequisites

This documentation contains the steps that must be done before installing the template.

## Install Node v0.10.33

- Installer node v0.10.33 or higher :)

# CNTLM

- Installer CNTLM (http://sourceforge.net/projects/cntlm/files/laTest/download?source=files)
- Editer le fichier .ini : C:\Program Files (x86)\Cntlm\cntlm.ini
- Entrer les Username / Domain / Password (ATTENTION NE PAS COMMENCER MOT DE PASSE PAR #)
- Entrer le proxy : proxy.srv-ib.ibp:8080

## NPM config
- Taper ces trois commandes :
> npm config set proxy http://localhost:3128
> npm config set https-proxy http://localhost:3128
> npm config set registry http://registry.npmjs.org

ou placer .npmrc directement dans c:\users\yourUserName avec le contenu:  
```
    proxy = http://localhost:3128/  
    https-proxy = http://localhost:3128/  
    registry = http://registry.npmjs.org/  
    strict-ssl = false  
```


## BOWER
- The bower config est dans les projets: fichier .bowerrc
- Lancer la commande : npm install -g bower	

```
{
    "directory": "vendor",
    "json": "bower.json",
    "strict-ssl":false,
    "proxy":"http://localhost:3128",
    "https-proxy": "http://localhost:3128",
    "timeout":120000,
    "analytics":false
}

```

## GIT

- Installer Git http://git-scm.com/download/win
- Rebooter
- Commande à executer dans le shell git : 
		git config --global http.proxy http://localhost:3128
		git config --global https.proxy http://localhost:3128
		git config --global http.sslVerify false 
		git config --global url."https://".insteadOf git://
- Contenue du fichier .gitConfig : 
		[http]
			proxy = http://localhost:3128
			sslVerify = false
		[https]
			proxy = http://localhost:3128
		[url "https://"]
			insteadOf = git://
- Configuration de la variable d'environnement PATH=%PATH%;C:\Program Files\Git\bin 
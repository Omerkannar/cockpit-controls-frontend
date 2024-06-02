FROM artifactory.esl.corp.elbit.co.il/aerospace-simulators-devops-docker/rhel/7.9:artifactory-configured-runtime
    
COPY . /
RUN echo $'\n[epel2]\nname=Extra Packages for Enterprise Linux 7 - $basearch\nbaseurl=http://artifactory.esl.corp.elbit.co.il/artifactory/rpm/pub/epel/7/$basearch\nfailovermethod=priority\nenabled=1\ngpgcheck=0' >> /etc/yum.repos.d/artifactory.repo ;\
	yum install -y nodejs ;\
	yum install -y npm

WORKDIR / 

RUN npm install
	
ENTRYPOINT ["npm", "run", "storybook"]